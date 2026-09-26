import { useState } from 'react';

const Footer = () => {
  const [exitState, setExitState] = useState(0);

  return (
    <footer className="border-t border-[#27272a] py-12 container flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div>
        <div className="font-sans text-small mb-1">ANUNAY NAMAN</div>
        <div className="font-mono text-tiny text-muted">ML / BACKEND / DSA</div>
      </div>
      
      <div className="font-mono text-tiny text-dim text-right">
        <p className="mb-2">Built with: React / TypeScript / curiosity / questionable sleep schedules</p>
        <p>© 2026 Anunay Naman</p>
      </div>
      
      <div className="font-mono text-tiny">
        {exitState === 0 && (
          <button onClick={() => setExitState(1)} className="text-dim hover:text-accent transition-colors cursor-text">
            {'>'} exit?
          </button>
        )}
        {exitState === 1 && (
          <span className="text-white">not yet.</span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
