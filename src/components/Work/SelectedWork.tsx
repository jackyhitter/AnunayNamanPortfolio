import { useRef, useEffect } from 'react';
import { projects } from '../../data/projects';

// Row with mouse proximity gradient effect
const WorkRow = ({ project, idx }: { project: (typeof projects)[0]; idx: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const glow = glowRef.current;
    if (!row || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(96, 165, 250, 0.06), transparent 70%)`;
      glow.style.opacity = '1';
    };
    const handleMouseLeave = () => { glow.style.opacity = '0'; };

    row.addEventListener('mousemove', handleMouseMove);
    row.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      row.removeEventListener('mousemove', handleMouseMove);
      row.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#27272a] pb-12 last:border-0 group relative"
      style={{ transition: 'border-color 0.3s' }}
    >
      {/* Proximity glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-sm" style={{ opacity: 0 }} />

      <div className="md:col-span-1 font-code text-tiny mt-1 transition-colors relative z-10"
           style={{ color: 'var(--stat-color)', opacity: 0.7 }}>
        0{idx + 1}
      </div>

      <div className="md:col-span-4 relative z-10">
        <h3 className="font-sans text-body font-bold text-white mb-2">{project.title}</h3>
        {project.maturity && (
          <div className="font-code text-[10px] mb-4 border border-[#27272a] inline-block px-2 py-1 transition-colors hover-bubbly cursor-pointer"
               style={{ color: 'var(--text-muted)' }}>
            {project.maturity}
          </div>
        )}
      </div>

      <div className="md:col-span-5 flex flex-col gap-6 relative z-10">
        <p className="font-serif text-small italic" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 6).map(tech => (
            <span
              key={tech}
              className="font-code text-[10px] border px-2 py-1 transition-colors hover-bubbly cursor-default"
              style={{
                borderColor: 'rgba(94, 234, 212, 0.15)',
                color: 'var(--tag-color)',
                backgroundColor: 'rgba(94, 234, 212, 0.03)',
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="font-code text-[10px] border border-[#27272a] px-2 py-1" style={{ color: 'var(--text-dim)' }}>
              +{project.technologies.length - 6}
            </span>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col items-start md:items-end gap-2 relative z-10">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
           className="font-code text-tiny hover:text-white transition-colors flex items-center gap-2"
           style={{ color: 'var(--text-dim)' }}>
          [OPEN REPO ↗]
        </a>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
             className="font-code text-tiny hover:text-white transition-colors flex items-center gap-2"
             style={{ color: 'var(--text-dim)' }}>
            [LIVE DEMO ↗]
          </a>
        )}
      </div>
    </div>
  );
};

const SelectedWork = () => {
  const featured = projects.filter(p => p.type === 'featured').slice(0, 3);

  return (
    <section id="work" className="section container border-t">
      <div className="flex justify-between items-end mb-16">
        <h2 className="font-code text-tiny" style={{ color: 'var(--text-muted)' }}>SELECTED WORK</h2>
        <a href="https://github.com/jackyhitter" target="_blank" rel="noopener noreferrer"
           className="font-code text-tiny hover:text-white transition-colors"
           style={{ color: 'var(--text-dim)' }}>
          [VIEW ALL ON GITHUB ↗]
        </a>
      </div>

      <div className="flex flex-col gap-12">
        {featured.map((project, idx) => (
          <WorkRow key={project.id} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;

