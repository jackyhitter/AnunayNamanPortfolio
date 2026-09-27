import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import HeroNetwork from './HeroNetwork';
import ParticleCharacter from './ParticleCharacter';

const QUOTE = '"I like understanding systems deeply enough to rebuild them, then breaking them again to see where they fail."';

const SKILLS = [
  '[ MACHINE LEARNING ]',
  '[ DATA SCIENCE ]',
  '[ BACKEND ]',
  '[ ALGORITHMS ]',
  '[ SYSTEMS ]',
];

// Typewriter hook
const useTypewriter = (text: string, speed = 28, startDelay = 2600) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const { displayed, done } = useTypewriter(QUOTE);

  // Hand cursor cycles through skills
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % SKILLS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => setIntroComplete(true) });
    gsap.set('.hero-content, .hero-nav, .hero-scroll, .particle-container, .hero-network', { opacity: 0 });
    gsap.set('.sys-coord', { opacity: 0 });

    tl.to('.sys-coord', { opacity: 1, duration: 0.2, stagger: 0.1, ease: 'power2.inOut' })
      .to('.sys-coord', { opacity: 0.3, duration: 0.3, delay: 0.2 })
      .to('.particle-container', { opacity: 1, duration: 0.5 }, '-=0.2')
      .to('.hero-network', { opacity: 1, duration: 0.5 }, '-=0.2')
      .to('.hero-content', { opacity: 1, duration: 0.5 }, '-=0.1')
      .to('.hero-nav', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to('.hero-scroll', { opacity: 1, duration: 0.5 });
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-screen overflow-hidden bg-[#080808] text-white">

      {/* Intro system coordinates */}
      {!introComplete && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center font-code text-[10px] opacity-50" style={{ color: 'var(--accent-color)' }}>
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
          <h1 className="font-sans text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter mb-8">
            ANUNAY<br />NAMAN
          </h1>

          {/* Skill list with hand cursor cycling */}
          <div className="font-code text-tiny mb-10 flex flex-col gap-2">
            {SKILLS.map((skill, i) => (
              <div key={skill} className="flex items-center gap-3 transition-all duration-500"
                   style={{ opacity: i === activeSkill ? 1 : 0.6 }}>
                {/* Hand cursor — only shows on active */}
                <span
                  className="text-base select-none inline-block transition-all duration-300"
                  style={{
                    opacity: i === activeSkill ? 1 : 0,
                    transform: i === activeSkill ? 'translateX(0px)' : 'translateX(-8px)',
                    width: '18px',
                  }}
                >
                  ☞
                </span>
                <span
                  className="transition-all duration-400"
                  style={{
                    color: i === activeSkill ? 'var(--tag-color)' : 'var(--text-muted)',
                    borderBottom: i === activeSkill ? '1px solid rgba(13,148,136,0.55)' : '1px solid transparent',
                    paddingBottom: '1px',
                    letterSpacing: '0.06em',
                  }}
                >
                  {skill}
                </span>
              </div>
            ))}
          </div>

          {/* Typewriter quote */}
          <div className="font-serif text-body max-w-md italic" style={{ color: 'var(--text-muted)', minHeight: '5rem' }}>
            <span>{displayed}</span>
            {!done && <span className="typing-cursor" />}
          </div>
        </div>

        {/* Right Side: Particle Anime Artwork */}
        <div className="particle-container flex-1 h-full relative border-l border-[#ffffff0a]">
          <ParticleCharacter />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-20 font-code text-[10px] flex flex-col items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        <span>SCROLL TO ENTER</span>
        <div className="w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}></div>
      </div>

    </section>
  );
};

export default Hero;
