import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'INIT' },
  { id: 'about', label: 'ABOUT' },
  { id: 'building', label: 'BUILDING' },
  { id: 'work', label: 'WORK' },
  { id: 'learning', label: 'LEARNING' },
  { id: 'algorithms', label: 'DSA' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
];

const SectionProgress = () => {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after first scroll
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-2 cursor-pointer"
            title={label}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            {/* Label — appears on hover */}
            <span
              className="font-code text-[9px] tracking-widest transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
              style={{ color: isActive ? 'var(--tag-color)' : 'var(--text-dim)', fontSize: '9px' }}
            >
              {label}
            </span>

            {/* Line/dot */}
            <div
              className="transition-all duration-300"
              style={{
                width: isActive ? '24px' : '10px',
                height: '1.5px',
                borderRadius: '2px',
                backgroundColor: isActive ? 'var(--tag-color)' : 'rgba(255,255,255,0.18)',
                boxShadow: isActive ? '0 0 8px rgba(94,234,212,0.5)' : 'none',
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionProgress;
