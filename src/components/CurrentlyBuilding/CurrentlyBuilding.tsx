import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const currentWork = [
  {
    id: '01',
    title: 'CITY-SCALE COMPUTER VISION',
    desc: 'ANPR / trajectory intelligence',
    tech: ['YOLOv8', 'OCR', 'OpenCV', 'PostGIS', 'FastAPI'],
    status: 'ACTIVE'
  },
  {
    id: '02',
    title: 'ML ENGINEERING',
    desc: 'Model experimentation, feature engineering, evaluation and deployment.',
    tech: ['Scikit-learn', 'CatBoost', 'Pandas', 'Flask'],
    status: 'EXPERIMENTING'
  },
  {
    id: '03',
    title: 'BACKEND SYSTEMS',
    desc: 'Scalable APIs, spatial databases and efficient routing.',
    tech: ['Node.js', 'PostgreSQL', 'FastAPI', 'Docker'],
    status: 'BUILDING'
  },
  {
    id: '04',
    title: 'ALGORITHMIC PRACTICE',
    desc: 'Advanced problem solving and optimization.',
    tech: ['C++', 'DSA', 'Dynamic Programming', 'Graphs'],
    status: 'CONTINUOUS'
  }
];

const CurrentlyBuilding = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = gsap.utils.toArray('.cb-item') as HTMLElement[];
    
    // Horizontal scroll effect on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => "+=" + containerRef.current!.offsetWidth * 2
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="building" className="section border-t overflow-hidden bg-[#0c0c0c]" ref={containerRef}>
      <div className="container mb-8">
        <h2 className="font-mono text-tiny text-muted">CURRENTLY BUILDING</h2>
      </div>
      
      <div className="flex flex-col md:flex-row md:w-[400vw] lg:w-[300vw] h-full">
        {currentWork.map((item) => (
          <div key={item.id} className="cb-item w-full md:w-screen px-4 md:px-12 lg:px-24 flex-shrink-0 flex flex-col justify-center border-l border-[#27272a] bg-[#0c0c0c] py-16 md:py-32">
            
            <div className="font-mono text-[10vw] md:text-[8rem] text-[#27272a] leading-none select-none mb-8 opacity-50">
              {item.id}
            </div>
            
            <div className="max-w-2xl">
              <h3 className="font-sans text-[clamp(1.5rem,4vw,3rem)] font-bold text-white mb-4 tracking-tight leading-tight">
                {item.title}
              </h3>
              
              <p className="font-serif text-body text-dim italic mb-12">
                {item.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-12">
                {item.tech.map(t => (
                  <span key={t} className="font-mono text-tiny text-muted border border-[#27272a] px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3 font-mono text-tiny text-accent">
                <div className="relative flex items-center justify-center w-3 h-3">
                  <div className="absolute w-full h-full rounded-full bg-accent animate-ping opacity-50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                </div>
                [{item.status}]
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
