import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const currentWork = [
  {
    id: '01',
    title: 'CITY-SCALE COMPUTER VISION',
    desc: 'ANPR / trajectory intelligence',
    detail: 'License plate detection, vehicle tracking across a city-scale camera grid. Spatial indexing via PostGIS.',
    tech: ['YOLOv8', 'OCR', 'OpenCV', 'PostGIS', 'FastAPI'],
    status: 'ACTIVE',
    statusColor: 'var(--online-color)',
    gradientFrom: 'rgba(52, 211, 153, 0.14)',
    borderGlow: 'rgba(52, 211, 153, 0.15)',
  },
  {
    id: '02',
    title: 'ML ENGINEERING',
    desc: 'Model experimentation, feature engineering, evaluation and deployment.',
    detail: 'CatBoost + Scikit-learn pipelines, evaluation loops, model packaging for production.',
    tech: ['Scikit-learn', 'CatBoost', 'Pandas', 'Flask'],
    status: 'EXPERIMENTING',
    statusColor: 'var(--stat-color)',
    gradientFrom: 'rgba(251, 191, 36, 0.12)',
    borderGlow: 'rgba(251, 191, 36, 0.12)',
  },
  {
    id: '03',
    title: 'BACKEND SYSTEMS',
    desc: 'Scalable APIs, spatial databases and efficient routing.',
    detail: 'REST/async API design, PostgreSQL + spatial extensions, containerized with Docker.',
    tech: ['Node.js', 'PostgreSQL', 'FastAPI', 'Docker'],
    status: 'BUILDING',
    statusColor: 'var(--accent-color)',
    gradientFrom: 'rgba(96, 165, 250, 0.12)',
    borderGlow: 'rgba(96, 165, 250, 0.12)',
  },
  {
    id: '04',
    title: 'ALGORITHMIC PRACTICE',
    desc: 'Advanced problem solving and optimization.',
    detail: 'Daily C++ sessions — DP, graphs, segment trees. Building consistency as a discipline.',
    tech: ['C++', 'DSA', 'Dynamic Programming', 'Graphs'],
    status: 'CONTINUOUS',
    statusColor: 'var(--text-muted)',
    gradientFrom: 'rgba(192, 192, 192, 0.07)',
    borderGlow: 'rgba(192, 192, 192, 0.08)',
  },
];

// 3D Tilt + Proximity Gradient Card
const ProximityCard = ({ item }: { item: typeof currentWork[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const inner = innerRef.current;
    if (!card || !glow || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Proximity gradient
      glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${item.gradientFrom}, transparent 70%)`;
      glow.style.opacity = '1';

      // 3D tilt — subtle, max ±6deg
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 6;
      const rotX = -((y - cy) / cy) * 6;
      inner.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
      inner.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [item.gradientFrom]);

  return (
    <div
      ref={cardRef}
      className="cb-item flex-shrink-0 flex flex-col justify-center relative"
      style={{
        width: '100vw',
        minHeight: '100vh',
        padding: 'clamp(2rem, 6vw, 6rem) clamp(1.5rem, 8vw, 8rem)',
        backgroundColor: '#0b0b0b',
        borderLeft: `1px solid #1f1f1f`,
      }}
    >
      {/* Proximity glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, transition: 'opacity 0.25s ease', zIndex: 0 }} />

      {/* Inner content — 3D tilts */}
      <div
        ref={innerRef}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          zIndex: 10,
        }}
      >
        {/* Large ghosted number */}
        <div
          className="font-code leading-none select-none mb-6"
          style={{
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            letterSpacing: '-0.04em',
          }}
        >
          {item.id}
        </div>

        <div style={{ maxWidth: '680px' }}>
          {/* Status badge row */}
          <div className="flex items-center gap-3 mb-5 font-code text-[10px]">
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
              <div className="absolute w-full h-full rounded-full animate-ping" style={{ backgroundColor: item.statusColor, opacity: 0.4 }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.statusColor }} />
            </div>
            <span style={{ color: item.statusColor, letterSpacing: '0.1em' }}>[{item.status}]</span>
          </div>

          <h3
            className="font-sans font-bold text-white tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}
          >
            {item.title}
          </h3>

          <p className="font-serif text-body italic mb-2" style={{ color: 'var(--text-muted)' }}>
            {item.desc}
          </p>
          <p className="font-sans text-small mb-10" style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>
            {item.detail}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {item.tech.map(t => (
              <span
                key={t}
                className="font-code text-[11px] px-3 py-1.5 transition-all duration-200 hover-bubbly cursor-default"
                style={{
                  border: `1px solid ${item.borderGlow}`,
                  color: 'var(--tag-color)',
                  backgroundColor: 'rgba(94, 234, 212, 0.04)',
                  letterSpacing: '0.05em',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom corner index */}
      <div
        className="absolute bottom-8 right-8 font-code text-[10px]"
        style={{ color: 'var(--text-dim)', opacity: 0.5 }}
      >
        {item.id} / 04
      </div>
    </div>
  );
};

const CurrentlyBuilding = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const items = track.querySelectorAll('.cb-item');
    const totalItems = items.length;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Pin the wrapper and scroll the track horizontally
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalItems - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.inOut',
          },
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="building"
      style={{ background: '#0b0b0b', borderTop: '1px solid #1a1a1a' }}
    >
      {/* Section label — inside pinned area */}
      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${currentWork.length * 100}vw` }}
      >
        {currentWork.map((item, idx) => (
          <div key={item.id} style={{ position: 'relative', width: '100vw', flexShrink: 0 }}>
            {/* Label only on first card */}
            {idx === 0 && (
              <div
                className="absolute top-8 font-code text-[10px]"
                style={{
                  left: 'clamp(1.5rem, 8vw, 8rem)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  zIndex: 20,
                }}
              >
                CURRENTLY BUILDING
              </div>
            )}
            <ProximityCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyBuilding;
