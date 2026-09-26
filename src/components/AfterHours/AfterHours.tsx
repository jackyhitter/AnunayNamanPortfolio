import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { afterHoursData } from '../../data/afterHours';
import type { InterestCategory, InterestItem } from '../../data/afterHours';

gsap.registerPlugin(ScrollTrigger);

// Sub-component: Expanded item overlay
const ItemOverlay = ({ item, category, onClose }: { item: InterestItem; category: InterestCategory; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="max-w-lg w-full mx-4 border bg-[#0a0a0a] p-8 md:p-12 relative cursor-default"
        style={{ borderColor: category.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-tiny text-dim hover:text-white transition-colors"
        >
          [ESC]
        </button>

        {/* Category label */}
        <div className="font-mono text-[10px] mb-6 pb-4 border-b border-[#27272a]" style={{ color: category.color }}>
          {category.label} / ARCHIVE
        </div>

        <h3 className="font-sans text-heading font-bold text-white mb-4">{item.title}</h3>
        <p className="font-serif text-body text-dim italic mb-8">"{item.desc}"</p>

        {item.theme && (
          <div className="mb-6">
            <div className="font-mono text-[10px] text-muted mb-2">THEME</div>
            <div className="font-mono text-tiny text-white">{item.theme}</div>
          </div>
        )}
        {item.status && (
          <div>
            <div className="font-mono text-[10px] text-muted mb-2">STATUS</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="font-mono text-tiny text-white">{item.status}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component: F1 Telemetry Visual
const F1Telemetry = () => (
  <div className="border border-[#27272a] bg-[#0a0a0a] p-6 font-mono text-[10px] relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 blur-[60px] group-hover:opacity-15 transition-opacity duration-700" />
    <div className="text-red-400 mb-4">F1 TELEMETRY / DECORATIVE</div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <div className="text-dim">S1</div>
        <div className="text-white text-base font-bold">28.4</div>
      </div>
      <div>
        <div className="text-dim">S2</div>
        <div className="text-white text-base font-bold">33.1</div>
      </div>
      <div>
        <div className="text-dim">S3</div>
        <div className="text-white text-base font-bold">24.7</div>
      </div>
    </div>
    <div className="flex justify-between items-baseline border-t border-[#27272a] pt-4">
      <div>
        <div className="text-dim">LAP</div>
        <div className="text-red-400 text-base">43 / 70</div>
      </div>
      <div className="text-right">
        <div className="text-dim">SPEED</div>
        <div className="text-white text-base">324 km/h</div>
      </div>
    </div>
    <div className="text-dim mt-4 italic">Decorative — not real race data.</div>
  </div>
);

// Sub-component: Football Pitch
const FootballPitch = () => (
  <div className="border border-[#27272a] bg-[#0a0a0a] p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-5 blur-[60px] group-hover:opacity-15 transition-opacity duration-700" />
    
    {/* Mini pitch */}
    <div className="w-full aspect-[16/10] border border-[#27272a] relative bg-[#080808] mb-6 overflow-hidden">
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#27272a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[0.5px] w-[1px] h-full bg-[#27272a]" />
      {/* Player dots */}
      <div className="absolute top-[30%] left-[25%] w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
      <div className="absolute top-[50%] left-[40%] w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
      <div className="absolute top-[20%] left-[60%] w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.1s' }} />
      <div className="absolute top-[55%] left-[70%] w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
    
    <div className="font-mono text-[10px] text-muted mb-2">FOOTBALL</div>
    <div className="font-sans text-small font-bold text-white mb-1">Real Madrid. Ronaldo.</div>
    <div className="font-serif text-small text-dim italic">"That should explain enough."</div>
    <div className="font-mono text-[10px] text-blue-400 mt-4">CR7 / HALA MADRID</div>
  </div>
);

const AfterHours = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('anime');
  const [selectedItem, setSelectedItem] = useState<{ item: InterestItem; category: InterestCategory } | null>(null);

  const activeCat = afterHoursData.find(c => c.id === activeCategory);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo('.afterhours-title', 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="afterhours" className="section container border-t">
      
      {/* Header */}
      <div className="afterhours-title mb-16">
        <h2 className="font-mono text-tiny text-muted mb-4">AFTER HOURS</h2>
        <p className="font-serif text-body text-dim italic max-w-xl">
          Things I disappear into when I'm not building.
        </p>
      </div>

      {/* Category Selection — floating interactive objects */}
      <div className="flex flex-wrap gap-3 mb-12">
        {afterHoursData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`font-mono text-tiny px-5 py-3 border transition-all duration-300 relative overflow-hidden group ${
              activeCategory === cat.id 
                ? 'text-white bg-[#111]'
                : 'text-muted hover:text-white'
            }`}
            style={{ borderColor: activeCategory === cat.id ? cat.color : '#27272a' }}
          >
            {activeCategory === cat.id && (
              <div className="absolute inset-0 opacity-10" style={{ backgroundColor: cat.color }} />
            )}
            <span className="relative z-10">[{cat.label}]</span>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Archive Items */}
        <div className="lg:col-span-7">
          <div className="bg-[#0c0c0c] border border-[#27272a] min-h-[500px] relative overflow-hidden">
            
            {/* Ambient glow */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 transition-colors duration-1000 pointer-events-none"
              style={{ backgroundColor: activeCat?.color || '#fff' }}
            />

            {/* Archive header */}
            <div className="p-6 md:p-8 border-b border-[#27272a]">
              <div className="font-mono text-[10px] text-muted">
                ARCHIVE_VIEW: {activeCategory.toUpperCase()}
              </div>
              {activeCat?.subtitle && (
                <div className="font-serif text-small text-dim italic mt-2">
                  "{activeCat.subtitle}"
                </div>
              )}
            </div>

            {/* Items */}
            <div className="p-6 md:p-8 flex flex-col gap-0">
              {activeCat?.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group cursor-pointer border-b border-[#27272a] last:border-0 py-6 first:pt-0 hover:bg-[#111] transition-colors -mx-8 px-8"
                  onClick={() => setSelectedItem({ item, category: activeCat })}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-dim">0{idx + 1}</span>
                      <h3 className="font-sans text-body font-bold text-white group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-dim opacity-0 group-hover:opacity-100 transition-opacity">
                      [VIEW]
                    </span>
                  </div>
                  <p className="font-serif text-small text-dim italic ml-8">
                    "{item.desc}"
                  </p>
                  {item.theme && (
                    <div className="font-mono text-[10px] text-muted mt-2 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.theme}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Special Panels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* F1 Telemetry (always visible as an ambient piece) */}
          {(activeCategory === 'f1' || activeCategory === 'anime') && (
            <F1Telemetry />
          )}
          
          {/* Football Pitch (always visible as an ambient piece) */}
          {(activeCategory === 'football' || activeCategory === 'anime') && (
            <FootballPitch />
          )}

          {/* Games: Shelf visual */}
          {activeCategory === 'games' && (
            <div className="border border-[#27272a] bg-[#0a0a0a] p-6">
              <div className="font-mono text-[10px] text-muted mb-4">GAME SHELF</div>
              <div className="grid grid-cols-5 gap-2">
                {activeCat?.items.map((game, idx) => (
                  <div 
                    key={idx}
                    className="aspect-[3/4] bg-[#111] border border-[#27272a] flex items-end p-1 cursor-pointer hover:border-green-400 hover:-translate-y-1 transition-all duration-300 group"
                    onClick={() => setSelectedItem({ item: game, category: activeCat })}
                  >
                    <span className="font-mono text-[6px] md:text-[8px] text-dim group-hover:text-white transition-colors leading-tight">
                      {game.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[10px] text-dim mt-4 italic">
                "yes, I still play Getting Over It."
              </div>
            </div>
          )}

          {/* Rabbit Holes description */}
          {activeCategory === 'rabbitholes' && (
            <div className="border border-[#27272a] bg-[#0a0a0a] p-6">
              <div className="font-mono text-[10px] text-muted mb-4">PATTERN</div>
              <p className="font-serif text-small text-dim italic">
                "Sometimes I learn something not because it's useful, but because I wanted to know how it worked."
              </p>
            </div>
          )}

          {/* Personality Notes — dry observations */}
          <div className="border border-[#27272a] bg-[#0a0a0a] p-6">
            <div className="font-mono text-[10px] text-muted mb-4">NOTE TO SELF</div>
            <div className="font-serif text-small text-dim italic">
              {activeCategory === 'anime' && '"Attack on Titan is basically systems engineering as horror."'}
              {activeCategory === 'manga' && '"Reading the source material after the anime is a different experience entirely."'}
              {activeCategory === 'games' && '"RDR2 ruined other open worlds for me."'}
              {activeCategory === 'f1' && '"F1 is basically optimization with consequences."'}
              {activeCategory === 'football' && '"Football is tactical geometry with 22 moving variables."'}
              {activeCategory === 'art' && '"Not everything needs to be functional to be worth building."'}
              {activeCategory === 'movies' && '"Cinema is just storytelling through systems of light."'}
              {activeCategory === 'music' && '"Hip-hop is just poetry delivered with rhythm and attitude."'}
              {activeCategory === 'rabbitholes' && '"The internet is the greatest rabbit hole ever constructed."'}
            </div>
          </div>

        </div>
      </div>

      {/* Item Overlay */}
      {selectedItem && (
        <ItemOverlay 
          item={selectedItem.item} 
          category={selectedItem.category} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </section>
  );
};

export default AfterHours;
