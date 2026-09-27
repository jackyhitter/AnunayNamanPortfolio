import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const EasterEggGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Clear session storage eggs on mount so user can find them again on reload
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('egg_')) sessionStorage.removeItem(key);
    });

    // Initial popup after a short delay
    const initialTimer = setTimeout(() => {
      setMessage("Lumos! 🪄 Use your wand (cursor) to illuminate the dark and uncover the hidden secrets scattered across this realm...");
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    }, 2500);

    let hideTimeout: number;

    // Listen for easter egg discoveries
    const handleEggFound = (e: Event) => {
      const customEvent = e as CustomEvent;
      const eggName = customEvent.detail?.name || 'secret';
      
      const count = parseInt(localStorage.getItem('egg_count') || '0') + 1;
      localStorage.setItem('egg_count', count.toString());
      
      let rewardMsg = "";
      if (count === 1) rewardMsg = `10 points to Gryffindor! 🦁 You found the ${eggName}.`;
      else if (count === 2) rewardMsg = `Mischief Managed! 📜 The ${eggName} has been revealed.`;
      else if (count === 3) rewardMsg = `Outstanding! ✨ You uncovered the ${eggName}.`;
      else rewardMsg = `Merlin's beard! Another one! The ${eggName} is yours.`;

      setMessage(rewardMsg);
      setIsVisible(true);
      
      clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    };

    window.addEventListener('easter-egg-found', handleEggFound);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimeout);
      window.removeEventListener('easter-egg-found', handleEggFound);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-12 left-0 z-[100000] flex items-end transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? 'translate-x-8 opacity-100' : '-translate-x-[150%] opacity-0 pointer-events-none'}`}
    >
      {/* The Bot Avatar */}
      <div 
        className="w-12 h-12 bg-black border-2 border-accent/60 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center relative flex-shrink-0 mb-2 ml-2 mr-3"
        style={{ animation: 'morph-bubble 4s ease-in-out infinite' }}
      >
        <div className="absolute inset-0 bg-accent/10 rounded-full" style={{ animation: 'morph-bubble 3s ease-in-out infinite reverse' }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--accent-color)]"></div>
      </div>

      {/* The Message Bubble */}
      <div 
        className="bg-[#0c0c0c]/95 backdrop-blur-md border border-[#27272a] p-4 max-w-[280px] rounded-3xl rounded-bl-sm shadow-[4px_4px_20px_rgba(20,184,166,0.15)] relative mb-4"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* Tail of the bubble */}
        <div className="absolute -left-[7px] bottom-[-1px] w-4 h-4 bg-[#0c0c0c] border-b border-l border-[#27272a] rounded-bl-sm" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
        
        <div className="font-sans text-small font-bold text-white mb-1 flex items-center gap-2 relative z-10">
          <Sparkles size={14} className="text-accent animate-pulse" />
          Seeker Bot
        </div>
        <div className="font-code text-[11px] text-dim leading-relaxed relative z-10">
          {message}
        </div>
      </div>
    </div>
  );
};
