import { useState } from 'react';
import { films } from '../data/films';

const Cinema = () => {
  const [activeTab, setActiveTab] = useState<'WATCHED' | 'REWATCH' | 'MASTERPIECES'>('MASTERPIECES');
  const tabs: ('WATCHED' | 'REWATCH' | 'MASTERPIECES')[] = ['WATCHED', 'REWATCH', 'MASTERPIECES'];

  return (
    <section className="section container border-t">
      <h2 className="font-mono text-tiny text-muted mb-12">AFTER HOURS</h2>
      
      <div className="flex gap-8 border-b border-[#27272a] mb-8">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-tiny pb-4 border-b-2 transition-colors ${activeTab === tab ? 'border-accent text-white' : 'border-transparent text-muted hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {films.filter(f => f.category === activeTab).map((film, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="aspect-video bg-[#0a0a0a] border border-[#27272a] relative overflow-hidden flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               {/* Placeholder for film strip aesthetic */}
               <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-1">
                 {Array.from({length: 6}).map((_, i) => <div key={i} className="w-2 h-2 bg-[#27272a] ml-1"></div>)}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-1">
                 {Array.from({length: 6}).map((_, i) => <div key={i} className="w-2 h-2 bg-[#27272a] ml-1"></div>)}
               </div>
               <div className="font-serif text-small tracking-widest text-[#27272a] select-none">
                 {film.year}
               </div>
            </div>
            <h3 className="font-sans text-small mt-2">{film.title}</h3>
            <p className="font-serif text-tiny text-muted italic">"{film.note}"</p>
          </div>
        ))}
        {films.filter(f => f.category === activeTab).length === 0 && (
          <div className="font-mono text-tiny text-dim py-8">No records in this category.</div>
        )}
      </div>
    </section>
  );
};

export default Cinema;
