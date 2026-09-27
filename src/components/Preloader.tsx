import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300); // Small buffer before unmounting
      }
    });

    // 1. Fade in the AN text
    tl.to(textRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });

    // 2. Animate the conic gradient on the wiggling border
    const loadObj = { val: 0 };
    tl.to(loadObj, {
      val: 100,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (loaderRef.current) {
          loaderRef.current.style.setProperty('--load-pct', `${loadObj.val}%`);
        }
      }
    }, "-=0.2");

    // 3. The pop out effect! Scale up massively and fade out
    tl.to(bubbleRef.current, {
      scale: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.in'
    }, "+=0.2");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3
    }, "-=0.3");

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100000] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* The organic wiggling bubble container */}
      <div 
        ref={bubbleRef}
        className="relative flex items-center justify-center"
        style={{ width: '120px', height: '120px' }}
      >
        {/* Background track for the wiggling border */}
        <div 
          className="absolute inset-0"
          style={{
            animation: 'wiggle-bubble 3s ease-in-out infinite',
            padding: '2px',
            background: 'rgba(20, 184, 166, 0.1)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Active loading wiggling border */}
        <div 
          ref={loaderRef}
          className="absolute inset-0"
          style={{
            animation: 'wiggle-bubble 3s ease-in-out infinite',
            padding: '2px',
            background: 'conic-gradient(from 0deg, #14b8a6 0%, #14b8a6 var(--load-pct, 0%), transparent var(--load-pct, 0%))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Wiggling liquid shape (inner body) */}
        <div 
          className="absolute inset-[2px] bg-[#111] shadow-[inset_0_0_20px_rgba(20,184,166,0.2)]"
          style={{
            animation: 'wiggle-bubble 3s ease-in-out infinite'
          }}
        />

        {/* AN Text */}
        <div 
          ref={textRef}
          className="relative z-10 font-sans font-bold text-white text-[2rem] tracking-widest opacity-0"
        >
          AN
        </div>
      </div>

      <style>{`
        @keyframes wiggle-bubble {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }
      `}</style>
    </div>
  );
};
