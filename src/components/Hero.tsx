import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { profile } from '../data/profile';
import { MousePointer2 } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic entry animation
      gsap.fromTo('.hero-text-reveal', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.hero-node',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)', delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center container" style={{ paddingTop: '8rem' }}>
      
      {/* Constellation Concept */}
      <div ref={nodesRef} className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
        {/* Simplified abstract nodes for the concept */}
        <div className="relative w-full h-full max-w-4xl max-h-[600px]">
          {/* Central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center hero-text-reveal">
             <h1 className="text-display font-sans text-center" style={{ fontWeight: 600 }}>
               ANUNAY<br/>NAMAN
             </h1>
             <p className="font-mono text-tiny mt-4 text-muted text-center max-w-sm">
               {profile.subTagline}
             </p>
          </div>

          {/* Node: ML */}
          <div className="absolute top-[10%] left-[20%] hero-node pointer-events-auto cursor-help group">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" style={{ backgroundColor: 'var(--accent-color)' }}></div>
              <span className="font-mono text-tiny text-dim group-hover:text-white transition-colors">MACHINE LEARNING</span>
            </div>
            <div className="absolute top-full mt-2 left-0 w-48 p-2 border border-[#27272a] bg-[#0c0c0c] opacity-0 group-hover:opacity-100 transition-opacity font-serif text-small text-muted z-10">
              "Models are only useful when they survive contact with reality."
            </div>
          </div>

          {/* Node: BACKEND */}
          <div className="absolute bottom-[20%] right-[15%] hero-node pointer-events-auto cursor-help group">
            <div className="flex items-center gap-2">
              <span className="font-mono text-tiny text-dim group-hover:text-white transition-colors">BACKEND</span>
              <div className="w-2 h-2 rounded-full bg-blue-500" style={{ backgroundColor: 'var(--accent-color)' }}></div>
            </div>
            <div className="absolute bottom-full mb-2 right-0 w-48 p-2 border border-[#27272a] bg-[#0c0c0c] opacity-0 group-hover:opacity-100 transition-opacity font-serif text-small text-muted z-10 text-right">
              "APIs, databases, systems and the boring parts that make everything work."
            </div>
          </div>

          {/* Node: DSA */}
          <div className="absolute bottom-[30%] left-[10%] hero-node pointer-events-auto cursor-help group">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border border-gray-500"></div>
              <span className="font-mono text-tiny text-dim group-hover:text-white transition-colors">ALGORITHMS</span>
            </div>
            <div className="absolute bottom-full mb-2 left-0 w-48 p-2 border border-[#27272a] bg-[#0c0c0c] opacity-0 group-hover:opacity-100 transition-opacity font-serif text-small text-muted z-10">
              "Currently being humbled by graphs and DP."
            </div>
          </div>

          {/* Node: RESEARCH */}
          <div className="absolute top-[20%] right-[25%] hero-node pointer-events-auto cursor-help group">
             <div className="flex items-center gap-2">
              <span className="font-mono text-tiny text-dim group-hover:text-white transition-colors">RESEARCH</span>
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
            </div>
          </div>

          {/* Lines connecting them would go here, maybe an SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             {/* Abstract connecting lines between nodes could be drawn here with GSAP */}
             <line x1="20%" y1="10%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
             <line x1="85%" y1="80%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
             <line x1="10%" y1="70%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1" />
             <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="var(--border-color)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="mt-auto mb-12 flex justify-between items-end relative z-10 hero-text-reveal">
        <div className="flex gap-4">
          <a href="#work" className="font-mono text-tiny hover:text-accent border border-transparent hover:border-[#27272a] px-3 py-1 transition-all">[WORK]</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent border border-transparent hover:border-[#27272a] px-3 py-1 transition-all">[RESUME]</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent border border-transparent hover:border-[#27272a] px-3 py-1 transition-all">[GITHUB]</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent border border-transparent hover:border-[#27272a] px-3 py-1 transition-all">[LINKEDIN]</a>
        </div>
        
        <div className="font-mono text-tiny text-muted flex items-center gap-2">
          SCROLL TO EXPLORE <MousePointer2 size={12} />
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
