import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const HOUSES = [
  {
    name: 'Gryffindor',
    color: '#dc2626', // Crimson red
    quote: "You might belong in Gryffindor, where dwell the brave at heart. Their daring, nerve, and chivalry set Gryffindors apart.",
    tagColor: '#fca5a5',
    onlineColor: '#ef4444',
    statColor: '#f59e0b',
    bgDark: '#1a0505',
  },
  {
    name: 'Slytherin',
    color: '#10b981', // Emerald green
    quote: "Or perhaps in Slytherin, you'll make your real friends. Those cunning folk use any means to achieve their ends.",
    tagColor: '#6ee7b7',
    onlineColor: '#059669',
    statColor: '#10b981',
    bgDark: '#021008',
  },
  {
    name: 'Ravenclaw',
    color: '#3b82f6', // Blue
    quote: "Or yet in wise old Ravenclaw, if you've a ready mind. Where those of wit and learning, will always find their kind.",
    tagColor: '#93c5fd',
    onlineColor: '#60a5fa',
    statColor: '#93c5fd',
    bgDark: '#050a1f',
  },
  {
    name: 'Hufflepuff',
    color: '#eab308', // Yellow/Gold
    quote: "You might belong in Hufflepuff, where they are just and loyal. Those patient Hufflepuffs are true and unafraid of toil.",
    tagColor: '#fde047',
    onlineColor: '#eab308',
    statColor: '#fef08a',
    bgDark: '#171401',
  }
];

export const SortingHat = () => {
  const [sortState, setSortState] = useState<'idle' | 'thinking' | 'sorted'>('idle');
  const [house, setHouse] = useState<typeof HOUSES[0] | null>(null);

  const handleSort = () => {
    if (sortState !== 'idle') return;
    setSortState('thinking');
    
    setTimeout(() => {
      // Randomly select a house
      const selected = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      setHouse(selected);
      setSortState('sorted');
      
      const elementsToDust = document.querySelectorAll('main > div:not(:last-child), main > section#hero, nav, footer, .grid-overlay');
      
      const tl = gsap.timeline();
      
      tl.to(elementsToDust, {
        opacity: 0,
        filter: 'blur(10px) brightness(200%)',
        y: -30,
        scale: 0.98,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Magically update the site's CSS variables to match the house!
          document.documentElement.style.setProperty('--accent-color', selected.color);
          document.documentElement.style.setProperty('--tag-color', selected.tagColor);
          document.documentElement.style.setProperty('--online-color', selected.onlineColor);
          document.documentElement.style.setProperty('--stat-color', selected.statColor);
          document.documentElement.style.setProperty('--bg-color', selected.bgDark);
          
          // Update the ambient cursor glow as well
          const overlay = document.querySelector('.ambient-cursor-overlay') as HTMLElement;
          if (overlay) {
            overlay.style.setProperty('--ambient-color', selected.color);
          }
        }
      })
      .to(elementsToDust, {
        opacity: 1,
        filter: 'blur(0px) brightness(100%)',
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 1.2,
        ease: 'power2.out',
        clearProps: 'all'
      });
      
    }, 4500);
  };

  return (
    <section className="py-24 border-t border-[#27272a] bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Magical background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 0%, transparent 60%)' }}></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl md:text-4xl text-[#d4af37] mb-6 flex items-center justify-center gap-3">
          <Sparkles className="animate-pulse" /> The Sorting Ceremony <Sparkles className="animate-pulse" />
        </h2>
        
        {sortState === 'idle' && (
          <>
            <p className="font-sans text-dim mb-8 leading-relaxed max-w-lg mx-auto">
              "There's nothing hidden in your head the Sorting Hat can't see... So put me on and I will tell you where you ought to be."
            </p>
            <button 
              onClick={handleSort}
              className="border border-[#d4af37] text-[#d4af37] px-8 py-4 hover:bg-[#d4af37] hover:text-black transition-all duration-500 font-serif tracking-widest uppercase text-sm"
            >
              Put on the Hat
            </button>
          </>
        )}

        {sortState === 'thinking' && (
          <div className="flex flex-col items-center">
            <p className="font-serif text-lg italic text-[#e5e5e5] mb-8 animate-pulse">
              "Hmm... difficult. Very difficult. Plenty of courage, I see. Not a bad mind either. There's talent, oh my goodness, yes..."
            </p>
            <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {sortState === 'sorted' && house && (
          <div className="animate-fade-in-up">
            <p className="font-serif text-xl md:text-2xl italic text-dim mb-6 px-4">"{house.quote}"</p>
            <h3 className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tighter" style={{ color: house.color, textShadow: `0 0 40px ${house.color}` }}>
              {house.name}!
            </h3>
            <p className="mt-8 font-code text-[10px] text-muted">
              (The site's magic has been attuned to your house colors.)
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};
