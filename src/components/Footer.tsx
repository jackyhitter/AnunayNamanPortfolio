import { useState } from 'react';

const Footer = () => {
  const [exitState, setExitState] = useState(0);

  return (
    <footer className="w-full border-t border-[#27272a] bg-[#050505] pt-12 pb-16 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-50">
      <div className="flex flex-col gap-2">
        <div className="font-sans text-small font-bold text-white tracking-widest uppercase">ANUNAY NAMAN</div>
        <div className="font-mono text-[10px] md:text-tiny text-accent">ML / BACKEND / DSA</div>
        
        <div className="font-mono text-[10px] mt-4">
          {exitState === 0 && (
            <button onClick={() => setExitState(1)} className="text-dim hover:text-white transition-colors cursor-text">
              <span className="text-accent">{'>'}</span> exit?
            </button>
          )}
          {exitState === 1 && (
            <span className="text-white animate-pulse">not yet.</span>
          )}
        </div>
      </div>
      
      <div className="font-mono text-[10px] md:text-tiny flex flex-col gap-2 md:text-right border-l border-[#27272a] md:border-l-0 md:border-r border-[#27272a] pl-4 md:pl-0 md:pr-4 py-1 relative" style={{ color: 'var(--text-dim)' }}>
        <p>Built with: React / TypeScript / curiosity / questionable sleep schedules</p>
        <p style={{ color: 'var(--text-dim)', opacity: 0.7 }}>© 2026 Anunay Naman. All systems nominal.</p>
        <p 
          className="absolute -bottom-10 right-4 text-[8px] select-text selection:bg-accent selection:text-white cursor-help hover:text-dim transition-colors duration-1000" 
          style={{ color: '#050505' }}
          onMouseEnter={() => {
            if (!window.sessionStorage.getItem('egg_cowboy')) {
              window.dispatchEvent(new CustomEvent('easter-egg-found', { detail: { name: "Space Cowboy Egg" } }));
              window.sessionStorage.setItem('egg_cowboy', 'true');
            }
          }}
        >
          See you space cowboy...
        </p>
      </div>
    </footer>
  );
};

export default Footer;
