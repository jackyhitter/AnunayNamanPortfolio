import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Room = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  link: string;
  objects: string[];
};

const rooms: Room[] = [
  {
    id: 'work',
    title: 'WORK',
    subtitle: 'Production-style architecture and research.',
    color: '#2563eb',
    icon: '⬡',
    link: '#work',
    objects: ['LA PEACE', 'ML_PROJECT', 'OfflineMarket']
  },
  {
    id: 'lab',
    title: 'LAB',
    subtitle: 'Experiments, bugs, and learning in public.',
    color: '#10b981',
    icon: '◇',
    link: '#lab',
    objects: ['Rainbow Box', 'Scribble', 'JS Experiments']
  },
  {
    id: 'learning',
    title: 'LEARNING',
    subtitle: 'How the foundation was built.',
    color: '#f59e0b',
    icon: '△',
    link: '#learning',
    objects: ['Striver', 'Love Babbar', 'Krish Naik', 'Hitesh']
  },
  {
    id: 'afterhours',
    title: 'AFTER HOURS',
    subtitle: 'Culture, media, and obsessions.',
    color: '#8b5cf6',
    icon: '○',
    link: '#afterhours',
    objects: ['Anime', 'Games', 'F1', 'Football', 'Art']
  }
];

const ExploreWorld = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !worldRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section and drive the world with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          start: 'top top',
          end: '+=5000',
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      // Phase 1: Entry — grid floor rotates into view
      tl.fromTo('.explore-floor', 
        { rotateX: 90, opacity: 0 },
        { rotateX: 60, opacity: 0.3, duration: 1, ease: 'power2.out' },
        0
      );

      // Phase 2: Central hub appears
      tl.fromTo('.explore-hub',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        0.3
      );

      // Phase 3: Rooms fly in from different directions
      tl.fromTo('.room-work',
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.6
      );
      tl.fromTo('.room-lab',
        { y: -300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.8
      );
      tl.fromTo('.room-learning',
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        1.0
      );
      tl.fromTo('.room-afterhours',
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        1.2
      );

      // Phase 4: Connection lines draw
      tl.fromTo('.explore-connection',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.1, ease: 'power2.inOut' },
        1.5
      );
      tl.fromTo('.explore-connection-v',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, stagger: 0.1, ease: 'power2.inOut' },
        1.5
      );

      // Phase 5: Objects inside rooms shimmer in
      tl.fromTo('.room-object',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        2.0
      );

      // Phase 6: Camera/perspective shift as user continues scrolling
      tl.to('.explore-world-inner', {
        rotateX: -5,
        rotateY: 10,
        scale: 1.1,
        duration: 2,
        ease: 'power1.inOut'
      }, 2.5);

      // Phase 7: Prompt to continue
      tl.fromTo('.explore-prompt',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        3.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax on the world
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!worldRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const nx = (clientX / innerWidth - 0.5) * 2;
      const ny = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(worldRef.current, {
        rotateY: nx * 8,
        rotateX: ny * -4,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRoomClick = (link: string) => {
    const el = document.querySelector(link);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="explore" className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Fixed UI overlay */}
      <div className="absolute top-8 left-8 z-50">
        <h2 className="font-mono text-tiny text-muted tracking-widest">EXPLORE THE SYSTEM</h2>
        <div className="font-mono text-[10px] text-dim mt-2">SCROLL TO NAVIGATE</div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] z-50">
        <div 
          className="h-full bg-accent transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Room indicator */}
      <div className="absolute top-8 right-8 z-50 font-mono text-[10px] text-dim">
        {activeRoom ? (
          <span className="text-accent">[{activeRoom.toUpperCase()}]</span>
        ) : (
          <span>[OVERVIEW]</span>
        )}
      </div>

      {/* 3D World Container */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div ref={worldRef} className="explore-world-inner relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Floor Grid */}
          <div 
            className="explore-floor absolute w-[150vw] h-[150vh] -left-[25vw] -top-[25vh] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(39,39,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(39,39,42,0.4) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transformOrigin: 'center center',
              transform: 'rotateX(60deg) translateZ(-200px)'
            }}
          />

          {/* Central Hub — ANUNAY */}
          <div className="explore-hub relative flex items-center justify-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-[#27272a] bg-[#0a0a0a] flex items-center justify-center relative group z-20">
              <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl" />
              <div className="text-center">
                <div className="font-sans text-small font-bold text-white tracking-widest">AN</div>
                <div className="font-mono text-[8px] text-dim mt-1">SYSTEM</div>
              </div>
            </div>

            {/* Connection Lines - Horizontal */}
            <div className="explore-connection absolute left-1/2 top-1/2 -translate-y-[0.5px] w-[180px] md:w-[280px] h-[1px] bg-[#27272a] origin-left" style={{ transform: 'translateX(-280px) translateY(-0.5px)' }} />
            <div className="explore-connection absolute left-1/2 top-1/2 -translate-y-[0.5px] w-[180px] md:w-[280px] h-[1px] bg-[#27272a] origin-left" />
            
            {/* Connection Lines - Vertical */}
            <div className="explore-connection-v absolute left-1/2 top-1/2 -translate-x-[0.5px] w-[1px] h-[180px] md:h-[240px] bg-[#27272a] origin-top" style={{ transform: 'translateX(-0.5px) translateY(-240px)' }} />
            <div className="explore-connection-v absolute left-1/2 top-1/2 -translate-x-[0.5px] w-[1px] h-[180px] md:h-[240px] bg-[#27272a] origin-top" />
          </div>

          {/* ROOM: WORK — Left */}
          <div 
            className="room-work absolute cursor-pointer group"
            style={{ left: '-340px', top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={() => setActiveRoom('work')}
            onMouseLeave={() => setActiveRoom(null)}
            onClick={() => handleRoomClick('#work')}
          >
            <div className="w-48 md:w-64 border border-[#27272a] bg-[#0a0a0a] p-6 group-hover:border-[#2563eb] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#2563eb] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[28px] text-[#27272a] group-hover:text-[#2563eb] transition-colors mb-3">⬡</div>
                <h3 className="font-sans text-small font-bold text-white mb-1">{rooms[0].title}</h3>
                <p className="font-mono text-[10px] text-dim mb-4">{rooms[0].subtitle}</p>
                <div className="flex flex-col gap-1">
                  {rooms[0].objects.map(obj => (
                    <div key={obj} className="room-object font-mono text-[10px] text-muted group-hover:text-[#2563eb] transition-colors">
                      → {obj}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-dim mt-4 group-hover:text-white transition-colors">[ENTER ↗]</div>
              </div>
            </div>
          </div>

          {/* ROOM: LAB — Top */}
          <div 
            className="room-lab absolute cursor-pointer group"
            style={{ left: '50%', top: '-280px', transform: 'translateX(-50%)' }}
            onMouseEnter={() => setActiveRoom('lab')}
            onMouseLeave={() => setActiveRoom(null)}
            onClick={() => handleRoomClick('#lab')}
          >
            <div className="w-48 md:w-64 border border-[#27272a] bg-[#0a0a0a] p-6 group-hover:border-[#10b981] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#10b981] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[28px] text-[#27272a] group-hover:text-[#10b981] transition-colors mb-3">◇</div>
                <h3 className="font-sans text-small font-bold text-white mb-1">{rooms[1].title}</h3>
                <p className="font-mono text-[10px] text-dim mb-4">{rooms[1].subtitle}</p>
                <div className="flex flex-col gap-1">
                  {rooms[1].objects.map(obj => (
                    <div key={obj} className="room-object font-mono text-[10px] text-muted group-hover:text-[#10b981] transition-colors">
                      → {obj}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-dim mt-4 group-hover:text-white transition-colors">[ENTER ↗]</div>
              </div>
            </div>
          </div>

          {/* ROOM: LEARNING — Right */}
          <div 
            className="room-learning absolute cursor-pointer group"
            style={{ right: '-340px', top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={() => setActiveRoom('learning')}
            onMouseLeave={() => setActiveRoom(null)}
            onClick={() => handleRoomClick('#learning')}
          >
            <div className="w-48 md:w-64 border border-[#27272a] bg-[#0a0a0a] p-6 group-hover:border-[#f59e0b] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#f59e0b] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[28px] text-[#27272a] group-hover:text-[#f59e0b] transition-colors mb-3">△</div>
                <h3 className="font-sans text-small font-bold text-white mb-1">{rooms[2].title}</h3>
                <p className="font-mono text-[10px] text-dim mb-4">{rooms[2].subtitle}</p>
                <div className="flex flex-col gap-1">
                  {rooms[2].objects.map(obj => (
                    <div key={obj} className="room-object font-mono text-[10px] text-muted group-hover:text-[#f59e0b] transition-colors">
                      → {obj}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-dim mt-4 group-hover:text-white transition-colors">[ENTER ↗]</div>
              </div>
            </div>
          </div>

          {/* ROOM: AFTER HOURS — Bottom */}
          <div 
            className="room-afterhours absolute cursor-pointer group"
            style={{ left: '50%', bottom: '-320px', transform: 'translateX(-50%)' }}
            onMouseEnter={() => setActiveRoom('afterhours')}
            onMouseLeave={() => setActiveRoom(null)}
            onClick={() => handleRoomClick('#afterhours')}
          >
            <div className="w-48 md:w-72 border border-[#27272a] bg-[#0a0a0a] p-6 group-hover:border-[#8b5cf6] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#8b5cf6] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[28px] text-[#27272a] group-hover:text-[#8b5cf6] transition-colors mb-3">○</div>
                <h3 className="font-sans text-small font-bold text-white mb-1">{rooms[3].title}</h3>
                <p className="font-mono text-[10px] text-dim mb-4">{rooms[3].subtitle}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {rooms[3].objects.map(obj => (
                    <div key={obj} className="room-object font-mono text-[10px] text-muted group-hover:text-[#8b5cf6] transition-colors">
                      → {obj}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-dim mt-4 group-hover:text-white transition-colors">[ENTER ↗]</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Continue prompt */}
      <div className="explore-prompt absolute bottom-8 left-1/2 -translate-x-1/2 z-40 font-mono text-[10px] text-dim flex flex-col items-center gap-2 opacity-0">
        <span>CLICK A ROOM TO ENTER</span>
        <span>OR CONTINUE SCROLLING</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-dim to-transparent mt-1" />
      </div>
    </section>
  );
};

export default ExploreWorld;
