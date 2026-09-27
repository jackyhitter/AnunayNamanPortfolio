import { useState, useRef, useEffect } from 'react';
import { learningTracks, learningEvolution } from '../../data/learning';

// 3D matte card with proximity glow + tilt
const TrackCard = ({ track, idx, isHighlighted }: {
  track: (typeof learningTracks)[0];
  idx: number;
  isHighlighted: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const GLOW_COLORS: Record<string, string> = {
    'love-babbar': 'rgba(251,191,36,0.10)',
    'striver': 'rgba(52,211,153,0.10)',
    'krish-naik': 'rgba(96,165,250,0.10)',
    'hitesh': 'rgba(244,114,182,0.08)',
  };

  const ACCENT_COLORS: Record<string, string> = {
    'love-babbar': '#fbbf24',
    'striver': '#34d399',
    'krish-naik': '#60a5fa',
    'hitesh': '#f472b6',
  };

  const accent = ACCENT_COLORS[track.id] ?? '#5eead4';
  const glow = GLOW_COLORS[track.id] ?? 'rgba(94,234,212,0.08)';

  useEffect(() => {
    const card = cardRef.current;
    const glowEl = glowRef.current;
    const inner = innerRef.current;
    if (!card || !glowEl || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowEl.style.background = `radial-gradient(350px circle at ${x}px ${y}px, ${glow}, transparent 70%)`;
      glowEl.style.opacity = '1';

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 5;
      const rotX = -((y - cy) / cy) * 5;
      inner.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    };

    const onLeave = () => {
      glowEl.style.opacity = '0';
      inner.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [glow]);

  const backendTopics = ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Authentication', 'Backend Architecture', 'Deployment', 'Docker'];

  return (
    <div
      ref={cardRef}
      onClick={() => setExpanded(e => !e)}
      className="relative overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, #111113 0%, #0d0d0f 100%)',
        border: `1px solid ${isHighlighted ? accent : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isHighlighted
          ? `0 0 30px ${glow}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
          : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
        borderRadius: '2px',
      }}
    >
      {/* Proximity glow layer */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, transition: 'opacity 0.2s ease', zIndex: 0 }} />

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

      {/* Ghosted number */}
      <div
        className="absolute top-0 right-0 font-code leading-none select-none pointer-events-none"
        style={{
          fontSize: '120px',
          color: 'transparent',
          WebkitTextStroke: `1px ${accent}18`,
          lineHeight: 1,
          padding: '8px 16px 0 0',
          zIndex: 1,
        }}
      >
        0{idx + 1}
      </div>

      {/* Inner — tilts on hover */}
      <div
        ref={innerRef}
        className="relative p-8"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
          zIndex: 10,
        }}
      >
        {/* Meta badges */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="font-code text-[10px] px-2.5 py-1 border" style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0a` }}>
            {track.duration}
          </span>
          {track.lectures && (
            <span className="font-code text-[10px] px-2.5 py-1 border border-[#27272a]" style={{ color: 'var(--text-dim)' }}>
              {track.lectures}
            </span>
          )}
          <span className={`font-code text-[10px] px-2.5 py-1 border ${
            track.type === 'paid'
              ? 'border-yellow-900/50 text-yellow-400 bg-yellow-500/5'
              : 'border-emerald-900/50 text-emerald-400 bg-emerald-500/5'
          }`}>
            {track.type === 'paid' ? 'PAID' : 'FREE'}{track.platform && ` / ${track.platform.toUpperCase()}`}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-body font-bold text-white mb-1 leading-tight">{track.title}</h3>
        <div className="font-code text-[10px] mb-4" style={{ color: 'var(--text-dim)' }}>{track.provider}</div>
        <p className="font-serif text-small italic mb-6" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>{track.description}</p>

        {/* Primary focus badge */}
        {track.primaryFocus && (
          <div className="mb-6 p-3" style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}>
            <div className="font-code text-[9px] mb-1.5" style={{ color: accent, letterSpacing: '0.12em' }}>PRIMARY FOCUS</div>
            <div className="font-sans text-small font-bold text-white">{track.primaryFocus}</div>
          </div>
        )}

        {/* Focus topic pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {track.focus.map(f => (
            <span
              key={f}
              className="font-code text-[10px] px-2 py-1 border transition-colors"
              style={
                backendTopics.includes(f)
                  ? { borderColor: `${accent}40`, color: accent, background: `${accent}08` }
                  : { borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }
              }
            >
              {f}
            </span>
          ))}
        </div>

        {/* Expanded learning path */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#27272a] animate-fade-in">
            <div className="font-code text-[9px] mb-3" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>LEARNING PATH</div>
            <div className="flex items-center flex-wrap gap-2">
              {track.journey.map((stage, jIdx) => (
                <div key={stage} className="flex items-center gap-2">
                  <div className="font-code text-[10px] px-3 py-1" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                    {stage}
                  </div>
                  {jIdx < track.journey.length - 1 && (
                    <span className="font-code text-[10px]" style={{ color: accent }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-6">
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-code text-[11px] hover:text-white transition-colors"
            style={{ color: 'var(--text-dim)' }}
            onClick={e => e.stopPropagation()}
          >
            [VIEW SOURCE ↗]
          </a>
          <span className="font-code text-[10px]" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
            {expanded ? 'CLICK TO COLLAPSE ↑' : 'CLICK TO EXPAND ↓'}
          </span>
        </div>
      </div>
    </div>
  );
};

const LearningLog = () => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <section id="learning" className="section container border-t">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <h2 className="font-code text-tiny mb-4" style={{ color: 'var(--text-muted)' }}>HOW I BUILT THE FOUNDATION</h2>
        <p className="font-serif text-small italic" style={{ color: 'var(--text-dim)' }}>
          Continuous learning mapped across data science, algorithms, and backend architecture.
        </p>
      </div>

      {/* Evolution timeline */}
      <div className="mb-16 p-6 overflow-x-auto" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="font-code text-[9px] mb-5" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>LEARNING EVOLUTION</div>
        <div className="flex items-center gap-2 min-w-max">
          {learningEvolution.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className="px-4 py-2 font-code text-[10px] cursor-default transition-all duration-200"
                style={{
                  border: `1px solid ${hoveredStage === step.source ? 'rgba(94,234,212,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  background: hoveredStage === step.source ? 'rgba(94,234,212,0.05)' : '#0d0d0d',
                  color: hoveredStage === step.source ? 'var(--tag-color)' : 'var(--text-dim)',
                }}
                onMouseEnter={() => setHoveredStage(step.source)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {step.label}
              </div>
              {idx < learningEvolution.length - 1 && (
                <span className="font-code text-[10px]" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3D Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningTracks.map((track, idx) => (
          <TrackCard
            key={track.id}
            track={track}
            idx={idx}
            isHighlighted={hoveredStage === track.id}
          />
        ))}
      </div>

      {/* Duration summary — clean minimal */}
      <div className="mt-14 p-6" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="font-code text-[9px] mb-6" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>RESOURCE DURATIONS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {learningTracks.map(track => (
            <div
              key={track.id}
              className="text-center p-4 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#0d0d0d' }}
            >
              <div className="font-sans text-heading font-bold mb-1" style={{ color: 'var(--stat-color)' }}>{track.duration}</div>
              <div className="font-code text-[9px]" style={{ color: 'var(--text-dim)' }}>{track.provider.split('/')[0].trim()}</div>
            </div>
          ))}
        </div>
        <div className="font-code text-[9px] mt-4 text-right" style={{ color: 'var(--text-dim)', opacity: 0.5 }}>
          These are course/resource durations, not personal hours watched.
        </div>
      </div>
    </section>
  );
};

export default LearningLog;
