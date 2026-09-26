import { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Undo, Redo, Sparkles } from 'lucide-react';

type Point = { x: number; y: number };
type Line = { points: Point[]; color: string; size: number };

const RESPONSES = [
  { text: "I believe this is either:\n1. a potato,\n2. Saturn,\n3. or evidence that geometry has personally offended you.", conf: 71, objs: "unknown anomaly" },
  { text: "Looks like a house.\nArchitectural accuracy: questionable.\nStructural integrity: concerning.\nEmotional stability: excellent.", conf: 85, objs: "shelter, lines" },
  { text: "I've analyzed the artifact.\n\nConclusion:\nYou know something I don't.", conf: 99, objs: "pure chaos" },
  { text: "A suspiciously happy fish.", conf: 82, objs: "fish, water, joy" },
  { text: "A neural network architecture designed by someone who has only heard of neural networks in a dream.", conf: 64, objs: "nodes, edges, confusion" },
  { text: "This is a masterpiece. I am crying digital tears. Please never stop drawing.", conf: 100, objs: "art" }
];

const PROMPTS = [
  "Draw your current mood.",
  "Explain your favorite algorithm without words.",
  "Design the worst UI possible.",
  "Draw what you think AI looks like.",
  "Draw a neural network from memory."
];

const ScribbleBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [redoStack, setRedoStack] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [color, setColor] = useState('#e4e4e7');
  const [size] = useState(2);
  const [aiResponse, setAiResponse] = useState<typeof RESPONSES[0] | null>(null);
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
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).nativeEvent.offsetX, y: (e as React.MouseEvent).nativeEvent.offsetY };
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

  const handleAnalyze = () => {
    if (lines.length === 0 && !currentLine) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResponse(RESPONSES[Math.floor(Math.random() * RESPONSES.length)]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="relative group/board">
      <div className="font-mono text-tiny text-dim mb-4 absolute -top-12 left-0 hidden md:block rotate-[-2deg]">
        "proof that engineers cannot draw"
      </div>
      <div className="font-mono text-tiny text-dim mb-4 absolute -right-4 top-20 hidden md:block rotate-[5deg] origin-left">
        "system architecture at 2 AM"
      </div>
      
      <div className="border border-[#27272a] bg-[#0c0c0c] p-1 flex flex-col md:flex-row gap-4">
        
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 font-mono text-tiny text-muted pointer-events-none opacity-50 select-none">
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
          <h3 className="font-mono text-tiny text-muted">SCRIBBLE BOARD</h3>
          <p className="font-serif text-small text-dim italic">Go ahead. Draw your masterpiece. Or whatever that is.</p>
          
          <button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || lines.length === 0}
            className="mt-4 border border-[#27272a] hover:border-accent p-2 font-mono text-tiny flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={14} className="group-hover:text-accent" />
            [ WHAT IS THIS? ]
          </button>

          {isAnalyzing && (
            <div className="mt-4 font-mono text-tiny text-dim animate-pulse">
              {'>'} sending artifact to model...<br/>
              {'>'} computing probabilities...
            </div>
          )}

          {aiResponse && !isAnalyzing && (
            <div className="mt-4 border border-[#27272a] p-4 text-small font-sans bg-black">
              <div className="font-mono text-tiny text-muted mb-2 border-b border-[#27272a] pb-2">MODEL INTERPRETATION</div>
              <p className="whitespace-pre-line mb-4 text-dim">"{aiResponse.text}"</p>
              <div className="font-mono text-tiny flex flex-col gap-1 text-[#a1a1aa]">
                <div>Objects: {aiResponse.objs}</div>
                <div>Confidence: <span className="text-accent">{aiResponse.conf}%</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScribbleBoard;
