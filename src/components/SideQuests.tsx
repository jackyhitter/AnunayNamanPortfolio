import { archiveProjects, projects } from '../data/projects';
import ScribbleBoard from './ScribbleBoard';
import { ExternalLink } from 'lucide-react';

const SideQuests = () => {
  const rainbowBox = archiveProjects.find(p => p.id === 'rainbow-box');
  const jsBeginner = projects.find(p => p.id === 'js-beginner-projects');

  return (
    <section id="lab" className="section container border-t">
      <h2 className="font-mono text-tiny text-muted mb-16">LAB / SIDE QUESTS / PLAYGROUND</h2>

      {/* RAINBOW BOX FEATURED EXPERIMENT */}
      <div className="mb-32 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <div className="font-mono text-tiny text-accent mb-4 border border-accent inline-block px-2 py-1">◌ {rainbowBox?.maturity}</div>
          <h3 className="text-heading mb-4 font-sans">{rainbowBox?.title}</h3>
          <p className="font-serif text-muted mb-8 italic">"Not everything needs a business model."</p>
          <div className="font-sans text-small text-dim mb-8">
            Sometimes I build because I wondered what would happen. The visitor scrolls to find a moving block and tries to stop it. Just a fun idea.
          </div>
          {rainbowBox?.liveUrl && (
            <a href={rainbowBox.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#27272a] hover:border-accent hover:text-accent px-4 py-2 font-mono text-tiny transition-all">
              [ TRY TO CATCH IT ] <ExternalLink size={14} />
            </a>
          )}
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="aspect-video bg-[#0c0c0c] border border-[#27272a] relative overflow-hidden group cursor-crosshair">
             {/* Fake interactive preview */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111), linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-tr from-red-500 via-yellow-500 to-blue-500 animate-[spin_3s_linear_infinite] group-hover:scale-110 transition-transform blur-sm opacity-80"></div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0c0c0c] border border-[#27272a] flex items-center justify-center font-mono text-tiny text-dim group-hover:text-accent group-hover:border-accent transition-colors">
               BOX
             </div>
          </div>
        </div>
      </div>

      {/* JAVASCRIPT LEARNING ARCHIVE */}
      <div className="mb-32">
        <h3 className="font-mono text-small mb-8">LEARNING IN PUBLIC</h3>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Visual Growth Line */}
          <div className="w-full md:w-64 font-mono text-tiny flex flex-col relative border-l border-[#27272a] pl-6 ml-2 py-4">
            <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-[#27272a]"></div>
            <div className="absolute -left-[5px] bottom-4 w-2 h-2 rounded-full bg-accent"></div>
            
            <div className="text-dim mb-4">HTML / CSS</div>
            <div className="text-white mb-2 ml-4 relative"><span className="absolute -left-6 text-[#27272a]">├──</span> DOM manipulation</div>
            <div className="text-white mb-2 ml-4 relative"><span className="absolute -left-6 text-[#27272a]">├──</span> Event handling</div>
            <div className="text-white mb-2 ml-4 relative"><span className="absolute -left-6 text-[#27272a]">├──</span> Fetch API</div>
            <div className="text-white mb-2 ml-4 relative"><span className="absolute -left-6 text-[#27272a]">├──</span> Local Storage</div>
            <div className="text-white mb-8 ml-4 relative"><span className="absolute -left-6 text-[#27272a]">└──</span> Async JavaScript</div>
            
            <div className="text-muted mb-4 ml-8">↓ React / Node</div>
            <div className="text-muted mb-4 ml-8">↓ Larger applications</div>
            <div className="text-accent ml-8">↓ ML / CV / Backend systems</div>
          </div>

          <div className="flex-1">
            <div className="font-sans text-body text-dim mb-8 max-w-2xl">
              A collection of smaller applications built while mastering JavaScript fundamentals. Proof that I actually learned the core language before reaching for frameworks.
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['To-Do App', 'Quiz App', 'Expense Tracker', 'Weather App', 'E-Commerce Cart'].map((app, i) => (
                <div key={app} className="border border-[#27272a] bg-[#0c0c0c] p-4 group hover:border-accent transition-colors flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-tiny text-muted mb-2">0{i+1}</div>
                    <div className="font-sans text-small font-medium">{app}</div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="font-mono text-[10px] text-dim">{['DOM', 'Events', 'Storage', 'APIs', 'Async'][i]}</div>
                    {jsBeginner?.liveUrl && (
                      <a href={jsBeginner.liveUrl} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-accent transition-colors">
                        <ExternalLink size={14}/>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCRIBBLE BOARD */}
      <div className="mb-32">
        <ScribbleBoard />
      </div>

      {/* EXPERIMENTS ARCHIVE */}
      <div>
        <h3 className="font-mono text-tiny text-muted mb-8">MORE EXPERIMENTS</h3>
        <div className="flex flex-col gap-2 border-t border-[#27272a] pt-4">
          {[rainbowBox, jsBeginner, archiveProjects.find(p=>p.id==='first-website')].map(p => p && (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 hover:bg-[#111] border-b border-[#27272a] transition-colors items-center">
              <div className="font-sans text-small">{p.title}</div>
              <div className="font-serif text-small text-dim md:col-span-2 truncate">{p.description}</div>
              <div className="flex justify-between items-center">
                <div className="font-mono text-tiny text-accent opacity-80">{p.maturity}</div>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SideQuests;
