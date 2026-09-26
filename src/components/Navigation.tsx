import { useState, useEffect } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between font-mono text-tiny transition-all duration-700 ease-in-out pointer-events-none
      ${scrolled ? 'py-4 px-8 md:px-16 lg:px-24' : 'py-8 px-8 md:px-16 lg:px-24'}
    `}>
      {/* Left: Branding */}
      <div className={`tracking-widest z-10 transition-all duration-700 pointer-events-auto mix-blend-difference ${scrolled ? 'opacity-80 scale-90 origin-left' : 'opacity-100 scale-100'}`}>
        ANUNAY_NAMAN
      </div>

      {/* Middle/Right: Nav Links (Animates on scroll) */}
      <div 
        className="absolute top-1/2 flex gap-4 md:gap-8 transition-all duration-700 ease-in-out origin-right pointer-events-auto mix-blend-difference"
        style={{
          left: scrolled ? '100%' : '50%',
          transform: scrolled 
            ? 'translate(calc(-100% - max(8rem, 15vw)), -50%) scale(0.85)' 
            : 'translate(-50%, -50%) scale(1)',
          opacity: 1
        }}
      >
        {['WORK', 'ABOUT', 'EXPLORE', 'LAB'].map(item => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="hover:text-accent transition-colors"
          >
            [{item}]
          </a>
        ))}
      </div>

      {/* Right: Status */}
      <div className={`flex items-center gap-2 text-accent z-10 transition-all duration-700 pointer-events-auto mix-blend-difference ${scrolled ? 'scale-90 origin-right' : 'scale-100'}`}>
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        [ONLINE]
      </div>
    </nav>
  );
};

export default Navigation;
