import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const MAGIC_QUOTES = [
  "Ah, Harry... the wand chooses the wizard. You've uncovered the {egg}.",
  "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light. The {egg} revealed.",
  "It does not do to dwell on dreams and forget to live, but this secret is quite real. {egg} found.",
  "I solemnly swear that you are up to no good... You found the {egg}.",
  "I open at the close. The {egg} is yours.",
  "After all this time? ... Always. The {egg} awaits.",
  "Words are, in my not-so-humble opinion, our most inexhaustible source of magic. {egg} discovered."
];

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
      setMessage("Lumos! 🪄 Use your wand to illuminate the dark, Harry. The hidden secrets of this realm await you...");
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
      
      const count = parseInt(localStorage.getItem('egg_count') || '0');
      const newCount = count + 1;
      localStorage.setItem('egg_count', newCount.toString());
      
      const quoteTemplate = MAGIC_QUOTES[(newCount - 1) % MAGIC_QUOTES.length];
      const rewardMsg = quoteTemplate.replace('{egg}', eggName);

      setMessage(rewardMsg);
      setIsVisible(true);
      
      clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        setIsVisible(false);
      }, 7000);
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
      {/* The Golden Snitch Avatar */}
      <div 
        className="w-12 h-12 bg-[#0a0a0a] border-2 border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center relative flex-shrink-0 mb-2 ml-2 mr-3"
        style={{ animation: 'morph-bubble 4s ease-in-out infinite' }}
      >
        <div className="absolute inset-0 bg-[#d4af37]/10 rounded-full" style={{ animation: 'morph-bubble 3s ease-in-out infinite reverse' }}></div>
        <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse shadow-[0_0_12px_#fbbf24]"></div>
      </div>

      {/* The Parchment Message Bubble */}
      <div 
        className="bg-[#0c0a05]/95 backdrop-blur-md border border-[#d4af37]/50 p-4 max-w-[300px] rounded-3xl rounded-bl-sm shadow-[4px_4px_25px_rgba(212,175,55,0.15)] relative mb-4"
        style={{ transformOrigin: 'bottom left' }}
      >
        {/* Tail of the bubble */}
        <div className="absolute -left-[7px] bottom-[-1px] w-4 h-4 bg-[#0c0a05] border-b border-l border-[#d4af37]/50 rounded-bl-sm" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
        
        <div className="font-serif text-small font-bold text-[#d4af37] mb-1 flex items-center gap-2 relative z-10">
          <Sparkles size={14} className="text-[#d4af37] animate-pulse" />
          The Seeker
        </div>
        <div className="font-serif text-[12px] text-[#e5e5e5] leading-relaxed relative z-10 italic opacity-90">
          "{message}"
        </div>
      </div>
    </div>
  );
};
