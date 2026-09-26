import { projects } from '../../data/projects';

const SelectedWork = () => {
  const featured = projects.filter(p => p.type === 'featured').slice(0, 3);

  return (
    <section id="work" className="section container border-t">
      <div className="flex justify-between items-end mb-16">
        <h2 className="font-mono text-tiny text-muted">SELECTED WORK</h2>
        <a href="https://github.com/jackyhitter" target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent transition-colors">
          [VIEW ALL ON GITHUB ↗]
        </a>
      </div>

      <div className="flex flex-col gap-12">
        {featured.map((project, idx) => (
          <div key={project.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#27272a] pb-12 last:border-0 group">
            
            <div className="md:col-span-1 font-mono text-tiny text-muted mt-1 opacity-50 group-hover:text-accent group-hover:opacity-100 transition-colors">
              0{idx + 1}
            </div>

            <div className="md:col-span-4">
              <h3 className="font-sans text-body font-bold text-white mb-2">{project.title}</h3>
              {project.maturity && (
                <div className="font-mono text-[10px] text-accent mb-4 border border-[#27272a] inline-block px-2 py-1 group-hover:border-accent transition-colors">
                  {project.maturity}
                </div>
              )}
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <p className="font-serif text-small text-dim italic">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map(tech => (
                  <span key={tech} className="font-mono text-[10px] text-muted bg-[#111] border border-[#27272a] px-2 py-1">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="font-mono text-[10px] text-muted bg-[#111] border border-[#27272a] px-2 py-1">
                    +{project.technologies.length - 6}
                  </span>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-start md:items-end gap-2">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny text-dim hover:text-accent transition-colors flex items-center gap-2">
                [OPEN REPOSITORY ↗]
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny text-dim hover:text-accent transition-colors flex items-center gap-2">
                  [LIVE DEMO ↗]
                </a>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
