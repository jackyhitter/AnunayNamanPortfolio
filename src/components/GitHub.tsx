import { profile } from '../data/profile';

const GitHub = () => {
  return (
    <section className="section container border-t">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-mono text-tiny text-muted">OPEN SOURCE / BUILD LOG</h2>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent transition-colors flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GITHUB PROFILE
        </a>
      </div>

      <div className="border border-[#27272a] bg-[#0c0c0c] p-8 font-mono flex flex-col md:flex-row gap-8 items-center justify-between">
        <div>
          <div className="text-small mb-2">jackyhitter</div>
          <div className="text-tiny text-dim">Recent activity focused on ML_project and La Peace.</div>
        </div>
        
        {/* Placeholder for GitHub contribution graph abstraction */}
        <div className="flex gap-1">
          {Array.from({ length: 28 }).map((_, i) => (
             <div className="flex flex-col gap-1" key={i}>
                {Array.from({ length: 5 }).map((_, j) => {
                  const isActive = Math.random() > 0.6;
                  const intensity = Math.random();
                  return (
                    <div 
                      key={`${i}-${j}`} 
                      className={`w-3 h-3 rounded-sm ${isActive ? 'bg-accent' : 'bg-[#1a1a1a]'}`}
                      style={{ opacity: isActive ? intensity * 0.8 + 0.2 : 1 }}
                    ></div>
                  );
                })}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHub;
