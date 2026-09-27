import { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Undo, Redo, Sparkles } from 'lucide-react';

type Point = { x: number; y: number };
type Line = { points: Point[]; color: string; size: number };

const PROMPTS = [
  "Draw your current mood.",
  "Explain your favorite algorithm without words.",
  "Design the worst UI possible.",
  "Draw what you think AI looks like.",
  "Draw a neural network from memory."
];

type AnalysisResult = {
  text: string;
  conf: number;
  objs: string;
  error?: boolean;
};

const ScribbleBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [redoStack, setRedoStack] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [color, setColor] = useState('#e4e4e7');
  const [size] = useState(2);
  const [aiResponse, setAiResponse] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [promptStr, setPromptStr] = useState(PROMPTS[0]);

  const colors = ['#e4e4e7', '#f87171', '#3b82f6', '#fbbf24', '#0c0c0c']; // Paper/notebook colors + eraser

  useEffect(() => {
    setPromptStr(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Notebook grid background
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for(let i = 0; i < canvas.width; i+=20) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i+=20) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawLine = (line: Line) => {
      if (line.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.size;
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      ctx.stroke();
    };

    lines.forEach(drawLine);
    if (currentLine) drawLine(currentLine);

  }, [lines, currentLine]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    return { 
      x: (clientX - rect.left) * scaleX, 
      y: (clientY - rect.top) * scaleY 
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setCurrentLine({ points: [getCoordinates(e)], color, size });
    setAiResponse(null);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !currentLine) return;
    setCurrentLine({
      ...currentLine,
      points: [...currentLine.points, getCoordinates(e)]
    });
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentLine) return;
    setIsDrawing(false);
    setLines([...lines, currentLine]);
    setCurrentLine(null);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (lines.length === 0) return;
    const newLines = [...lines];
    const last = newLines.pop();
    if (last) {
      setRedoStack([...redoStack, last]);
      setLines(newLines);
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedo = [...redoStack];
    const item = newRedo.pop();
    if (item) {
      setLines([...lines, item]);
      setRedoStack(newRedo);
    }
  };

  const handleAnalyze = async () => {
    if (lines.length === 0 && !currentLine) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsAnalyzing(true);
    setAiResponse(null);

    // Actual client-side canvas analysis
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Count non-black pixels (drawn pixels)
      let drawnPixels = 0;
      let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i], g = pixels[i+1], b = pixels[i+2], a = pixels[i+3];
        if (a > 20 && (r > 30 || g > 30 || b > 30)) {
          drawnPixels++;
          const px = (i / 4) % canvas.width;
          const py = Math.floor((i / 4) / canvas.width);
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }

      const totalPixels = canvas.width * canvas.height;
      const coverage = (drawnPixels / totalPixels) * 100;
      const strokeCount = lines.length;
      const bboxWidth = maxX - minX;
      const bboxHeight = maxY - minY;
      const aspectRatio = bboxWidth > 0 && bboxHeight > 0 ? (bboxWidth / bboxHeight).toFixed(2) : '0';
      const density = bboxWidth > 0 && bboxHeight > 0 
        ? (drawnPixels / (bboxWidth * bboxHeight) * 100).toFixed(1) 
        : '0';

      // Generate interpretation based on real drawing properties
      let interpretation = '';
      let detectedPattern = '';
      const conf = Math.min(95, Math.max(40, Math.round(coverage * 8 + strokeCount * 3)));

      if (strokeCount === 0) {
        interpretation = "You clicked analyze on a blank canvas.\nBold move.";
        detectedPattern = 'void';
      } else if (strokeCount === 1 && coverage < 1) {
        interpretation = "A single, decisive stroke.\nMinimalism or indecision — hard to tell.";
        detectedPattern = 'single stroke';
      } else if (coverage > 15) {
        interpretation = "Heavy coverage detected.\nEither you're very expressive or very frustrated with the canvas.";
        detectedPattern = 'dense composition';
      } else if (strokeCount > 15) {
        interpretation = `${strokeCount} strokes detected.\nThis has the energy of someone who kept adding "just one more line."`;
        detectedPattern = 'complex sketch';
      } else if (Number(aspectRatio) > 2) {
        interpretation = "Wide horizontal composition.\nLandscape? Timeline? System architecture diagram at 2 AM?";
        detectedPattern = 'horizontal layout';
      } else if (Number(aspectRatio) < 0.5) {
        interpretation = "Tall vertical composition.\nA tower? A tree? A stack trace?";
        detectedPattern = 'vertical layout';
      } else if (strokeCount <= 3 && coverage < 3) {
        interpretation = "Simple and restrained.\nA few deliberate marks — either a face, a symbol, or the letter 'hi'.";
        detectedPattern = 'simple glyph';
      } else if (Number(density) > 30) {
        interpretation = "Densely packed strokes in a focused area.\nConcentrated energy. Possibly a face. Possibly chaos.";
        detectedPattern = 'concentrated form';
      } else {
        interpretation = `${strokeCount} strokes across ${coverage.toFixed(1)}% of the canvas.\nScattered but intentional. Like notes on a whiteboard.`;
        detectedPattern = 'scattered composition';
      }

      setAiResponse({
        text: interpretation,
        conf: conf,
        objs: `${strokeCount} strokes, ${coverage.toFixed(1)}% coverage, ${detectedPattern}`,
        error: false
      });

    } catch {
      setAiResponse({
        text: "Canvas analysis failed.\nThe drawing exists but I couldn't read it.",
        conf: 0,
        objs: "error",
        error: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative group/board">
      <div className="font-code text-tiny mb-4 absolute -top-12 left-0 hidden md:block rotate-[-2deg]" style={{ color: 'var(--text-muted)' }}>
        "proof that engineers cannot draw"
      </div>
      <div className="font-code text-tiny mb-4 absolute -right-4 top-20 hidden md:block rotate-[5deg] origin-left" style={{ color: 'var(--text-muted)' }}>
        "system architecture at 2 AM"
      </div>
      
      <div className="border border-[#27272a] bg-[#0c0c0c] p-1 flex flex-col md:flex-row gap-4">
        
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 font-code text-tiny pointer-events-none select-none" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            {promptStr}
          </div>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-[400px] bg-[#111] cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {colors.map(c => (
              <button 
                key={c} 
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-sm border ${color === c ? 'border-white' : 'border-[#27272a]'}`}
                style={{ backgroundColor: c === '#0c0c0c' ? '#111' : c }}
                title={c === '#0c0c0c' ? 'Eraser' : 'Color'}
              >
                {c === '#0c0c0c' && <Eraser size={14} className="m-auto text-dim" />}
              </button>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2 bg-[#0c0c0c] border border-[#27272a] p-1">
            <button onClick={handleUndo} disabled={lines.length===0} className="p-1 hover:text-white text-dim disabled:opacity-30"><Undo size={14}/></button>
            <button onClick={handleRedo} disabled={redoStack.length===0} className="p-1 hover:text-white text-dim disabled:opacity-30"><Redo size={14}/></button>
            <button onClick={() => {setLines([]); setRedoStack([]); setAiResponse(null)}} className="p-1 hover:text-red-400 text-dim"><Trash2 size={14}/></button>
          </div>
        </div>

        <div className="w-full md:w-64 flex flex-col gap-4 p-4 border-l border-[#27272a] bg-[#0a0a0a]">
          <h3 className="font-code text-tiny" style={{ color: 'var(--text-muted)' }}>SCRIBBLE BOARD</h3>
          <p className="font-serif text-small italic" style={{ color: 'var(--text-dim)' }}>Go ahead. Draw your masterpiece. Or whatever that is.</p>
          
          <button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || lines.length === 0}
            className="mt-4 border border-[#27272a] hover:border-accent p-2 font-mono text-tiny flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={14} className="group-hover:text-accent" />
            [ WHAT IS THIS? ]
          </button>

          {isAnalyzing && (
            <div className="mt-4 font-code text-tiny animate-pulse" style={{ color: 'var(--text-muted)' }}>
              {'>'} sending artifact to model...<br/>
              {'>'} computing probabilities...
            </div>
          )}

          {aiResponse && !isAnalyzing && (
            <div className={`mt-4 border p-4 text-small font-sans bg-black ${aiResponse.error ? 'border-red-900' : 'border-[#27272a]'}`}>
              <div className="font-code text-tiny border-b border-[#27272a] pb-2 mb-2" style={{ color: 'var(--text-muted)' }}>MODEL INTERPRETATION</div>
              <p className={`whitespace-pre-line mb-4 ${aiResponse.error ? 'text-red-400' : ''}`} style={aiResponse.error ? {} : { color: 'var(--text-muted)' }}>"{aiResponse.text}"</p>
              {!aiResponse.error && (
                <div className="font-code text-tiny flex flex-col gap-1" style={{ color: 'var(--text-dim)' }}>
                  <div>Objects: {aiResponse.objs}</div>
                  <div>Confidence: <span style={{ color: 'var(--stat-color)' }}>{aiResponse.conf}%</span></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScribbleBoard;
