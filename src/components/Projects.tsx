import { projects, archiveProjects } from '../data/projects';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  return (
    <section id="work" className="section container">
      <h2 className="font-mono text-tiny text-muted mb-12">FEATURED PROJECTS</h2>
      
      <div className="flex flex-col gap-24">
        {projects.filter(p => p.type === 'featured').map((project, idx) => (
          <div key={project.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start group">
            
            <div className="md:col-span-4 sticky top-24">
              <div className="font-mono text-tiny text-accent mb-4">0{idx + 1}</div>
              <h3 className="text-display mb-2">{project.title}</h3>
              <p className="font-serif text-muted mb-6">{project.subtitle}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.slice(0, 5).map(tech => (
                  <span key={tech} className="font-mono text-tiny border border-[#27272a] px-2 py-1 bg-[#111]">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny flex items-center gap-2 hover:text-accent transition-colors">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> REPOSITORY
                </a>
                <button className="font-mono text-tiny flex items-center gap-2 hover:text-accent transition-colors">
                  <ExternalLink size={14} /> CASE STUDY
                </button>
              </div>
            </div>
            
            <div className="md:col-span-8 md:col-start-6">
              {/* Abstract visual representation of project instead of generic screenshot */}
              <div className="aspect-[4/3] bg-[#111] border border-[#27272a] relative overflow-hidden flex items-center justify-center p-8 group-hover:border-accent transition-colors duration-500 hover-bubbly">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at center, var(--accent-color) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                
                <div className="relative z-10 text-center font-mono text-small text-muted max-w-md">
                   {project.id === 'la-peace' && (
                     <div className="flex flex-col gap-4">
                        <div className="border border-[#27272a] p-4 bg-black">
                          [ CAMERA NODE 01 ] -- {'>'} DETECTED: HR26XX9999
                        </div>
                        <div className="border border-[#27272a] p-4 bg-black ml-8">
                          [ POSTGIS ] -- {'>'} TRAJECTORY LOGGED
                        </div>
                     </div>
                   )}
                   {project.id === 'ml-project' && (
                     <div className="flex gap-4 items-center justify-center">
                        <span className="p-2 border border-[#27272a]">DATA</span>
                        <span>→</span>
                        <span className="p-2 border border-accent text-accent group/model relative cursor-help">
                          MODEL
                          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-[#27272a] p-2 text-[8px] whitespace-nowrap opacity-0 group-hover/model:opacity-100 transition-opacity pointer-events-none text-dim z-50">
                            random_state=42: The answer to life, universe & everything.
                          </span>
                        </span>
                        <span>→</span>
                        <span className="p-2 border border-[#27272a]">API</span>
                     </div>
                   )}
                </div>
              </div>
              
              <div className="mt-8 font-sans text-body text-dim max-w-2xl">
                {project.description}
              </div>
              
              {project.capabilities && (
                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-tiny">
                  {project.capabilities.map(cap => (
                    <div key={cap} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#27272a]"></div>
                      {cap}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Archive Section */}
      <div className="mt-32 border-t border-[#27272a] pt-16">
        <h2 className="font-mono text-tiny text-muted mb-8">ARCHIVE / EXPERIMENTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...projects.filter(p => p.type === 'experiment'), ...archiveProjects].map(project => (
            <a key={project.id} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block p-6 border border-[#27272a] bg-[#0a0a0a] transition-colors group hover-bubbly">
              <div className="font-mono text-tiny text-muted mb-4 group-hover:text-accent transition-colors">
                {project.type === 'experiment' ? 'EARLY EXPERIMENT' : 'ARCHIVED'}
              </div>
              <h3 className="text-heading mb-2">{project.title}</h3>
              <p className="font-serif text-small text-dim mb-6">{project.subtitle}</p>
              <div className="flex gap-2 font-mono text-tiny text-muted flex-wrap">
                {project.technologies.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
