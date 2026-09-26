import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import HeroNetwork from './HeroNetwork';
import ParticleCharacter from './ParticleCharacter';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Cinematic Intro Sequence
    const tl = gsap.timeline({
      onComplete: () => setIntroComplete(true)
    });

    // Initial state: hide everything
    gsap.set('.hero-content, .hero-nav, .hero-scroll, .particle-container, .hero-network', { 
      opacity: 0 
    });
    gsap.set('.sys-coord', { opacity: 0 });

    // Sequence
    tl.to('.sys-coord', { opacity: 1, duration: 0.2, stagger: 0.1, ease: 'power2.inOut' })
      .to('.sys-coord', { opacity: 0.3, duration: 0.3, delay: 0.2 })
      .to('.particle-container', { opacity: 1, duration: 0.5 }, "-=0.2")
      .to('.hero-network', { opacity: 1, duration: 0.5 }, "-=0.2")
      .to('.hero-content', { opacity: 1, duration: 0.5 }, "-=0.1")
      .to('.hero-nav', { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to('.hero-scroll', { opacity: 1, duration: 0.5 });
      
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-screen overflow-hidden bg-[#080808] text-white">
      
      {/* Intro system coordinates / terminal marks */}
      {!introComplete && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center font-mono text-[10px] text-accent opacity-50">
          <div className="absolute top-1/4 left-1/4 sys-coord">[SYS_INIT: 0x4A]</div>
          <div className="absolute top-3/4 right-1/4 sys-coord">[MEM_ALLOC: OK]</div>
          <div className="absolute bottom-1/4 left-1/3 sys-coord">[PARTICLE_ENG: RDY]</div>
        </div>
      )}

      {/* Network Background */}
      <div className="hero-network absolute inset-0 z-0">
        <HeroNetwork />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '5vw 5vw' }}>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        
        {/* Left Side: Typography & Identity */}
        <div className="hero-content flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="font-sans text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            ANUNAY<br />NAMAN
          </h1>
          
          <div className="font-mono text-tiny text-accent mb-12 flex flex-col gap-1">
            <span>[ MACHINE LEARNING ]</span>
            <span>[ DATA SCIENCE ]</span>
            <span>[ BACKEND ]</span>
            <span>[ ALGORITHMS ]</span>
            <span>[ SYSTEMS ]</span>
          </div>
          
          <p className="font-serif text-body text-dim max-w-md italic">
            "I like understanding systems deeply enough to rebuild them, then breaking them again to see where they fail."
          </p>
        </div>

        {/* Right Side: Particle Anime Artwork */}
        <div className="particle-container flex-1 h-full relative border-l border-[#ffffff0a]">
          <ParticleCharacter />
        </div>
      </div>



      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] text-dim flex flex-col items-center gap-2">
        <span>SCROLL TO ENTER</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-dim to-transparent"></div>
      </div>

    </section>
  );
};

export default Hero;
