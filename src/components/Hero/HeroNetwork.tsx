import { useEffect, useRef } from 'react';

const nodes = [
  { id: 'ml', label: 'MACHINE LEARNING', x: 20, y: 30, radius: 4 },
  { id: 'ds', label: 'DATA SCIENCE', x: 80, y: 20, radius: 3 },
  { id: 'be', label: 'BACKEND', x: 15, y: 70, radius: 4 },
  { id: 'algo', label: 'ALGORITHMS', x: 75, y: 75, radius: 4 },
  { id: 'cv', label: 'COMPUTER VISION', x: 50, y: 15, radius: 3 },
  { id: 'sys', label: 'SYSTEMS', x: 85, y: 50, radius: 3 },
  { id: 'rs', label: 'RESEARCH', x: 45, y: 85, radius: 3 },
];

const HeroNetwork = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalized mouse -1 to 1
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = (clientY / innerHeight) * 2 - 1;
      
      // Parallax effect on the entire SVG
      svgRef.current.style.transform = `translate(${nx * -20}px, ${ny * -20}px)`;
      
      // We can also select all circles and move them slightly based on proximity, 
      // but keeping it simple for performance. CSS handles hover scale well.
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      <svg ref={svgRef} className="w-full h-full opacity-30 transition-transform duration-700 ease-out" style={{ willChange: 'transform' }}>
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Connection Lines */}
        <g className="stroke-[#27272a] stroke-1">
          <line x1="20%" y1="30%" x2="50%" y2="15%" />
          <line x1="50%" y1="15%" x2="80%" y2="20%" />
          <line x1="20%" y1="30%" x2="15%" y2="70%" />
          <line x1="15%" y1="70%" x2="45%" y2="85%" />
          <line x1="45%" y1="85%" x2="75%" y2="75%" />
          <line x1="75%" y1="75%" x2="85%" y2="50%" />
          <line x1="85%" y1="50%" x2="80%" y2="20%" />
          <line x1="20%" y1="30%" x2="50%" y2="50%" className="stroke-accent opacity-20" />
          <line x1="80%" y1="20%" x2="50%" y2="50%" className="stroke-accent opacity-20" />
          <line x1="15%" y1="70%" x2="50%" y2="50%" className="stroke-accent opacity-20" />
          <line x1="75%" y1="75%" x2="50%" y2="50%" className="stroke-accent opacity-20" />
        </g>

        {/* Central Hub (Implicit center for Anunay Naman text) */}
        <circle cx="50%" cy="50%" r="20" fill="url(#nodeGlow)" />
        <circle cx="50%" cy="50%" r="2" fill="#fff" />

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className="pointer-events-auto cursor-none group">
            <circle 
              cx={`${node.x}%`} 
              cy={`${node.y}%`} 
              r={node.radius * 3} 
              fill="transparent" 
              className="hover:r-8 transition-all duration-300"
            />
            <circle cx={`${node.x}%`} cy={`${node.y}%`} r={node.radius} fill="#3f3f46" className="group-hover:fill-accent transition-colors" />
            <text 
              x={`${node.x}%`} 
              y={`${node.y + 3}%`} 
              textAnchor="middle" 
              className="font-mono text-[10px] fill-dim group-hover:fill-white transition-colors"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default HeroNetwork;
