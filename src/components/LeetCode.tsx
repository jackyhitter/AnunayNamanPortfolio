import { useState } from 'react';
import { Terminal, Check, X } from 'lucide-react';
import { profile } from '../data/profile';

const LeetCode = () => {
  const [grindState, setGrindState] = useState<'idle' | 'solving' | 'compiling' | 'wrong' | 'accepted'>('idle');

  const handleGrind = () => {
    if (grindState !== 'idle') return;
    setGrindState('solving');
    setTimeout(() => setGrindState('compiling'), 1500);
    setTimeout(() => setGrindState('wrong'), 3000);
    setTimeout(() => setGrindState('solving'), 4500);
    setTimeout(() => setGrindState('compiling'), 6000);
    setTimeout(() => setGrindState('accepted'), 7500);
    setTimeout(() => setGrindState('idle'), 10000);
  };

  return (
    <section id="research" className="section container border-t">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-mono text-tiny text-muted">ALGORITHMIC PRACTICE</h2>
        <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="font-mono text-tiny hover:text-accent transition-colors">
          LEETCODE ↗
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="text-huge text-accent mb-4">268</div>
          <div className="font-mono text-tiny mb-8">PROBLEMS SOLVED</div>
          
          <div className="flex gap-12 font-mono text-small text-muted mb-12">
            <div>
              <div className="text-white mb-1">C++</div>
              <div>244</div>
            </div>
            <div>
              <div className="text-white mb-1">PYTHON</div>
              <div>24</div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-mono text-tiny text-muted mb-4">BADGES</h3>
            <div className="flex gap-4">
              <div className="border border-[#27272a] px-3 py-1 font-mono text-tiny">50 DAYS</div>
              <div className="border border-[#27272a] px-3 py-1 font-mono text-tiny">100 DAYS</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-6">
          <h3 className="font-mono text-tiny text-muted mb-6">DSA MAP</h3>
          <div className="flex flex-col gap-2 font-mono text-small text-dim border-l border-[#27272a] pl-4">
            <span className="hover:text-white transition-colors cursor-default">ARRAYS</span>
            <span className="ml-2">↓</span>
            <span className="hover:text-white transition-colors cursor-default">HASH TABLES</span>
            <span className="ml-2">↓</span>
            <span className="hover:text-white transition-colors cursor-default">TREES</span>
            <span className="ml-2">↓</span>
            <span className="hover:text-white transition-colors cursor-default text-accent">GRAPHS</span>
            <span className="ml-2">↓</span>
            <span className="hover:text-white transition-colors cursor-default text-accent">DYNAMIC PROGRAMMING</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="border border-[#27272a] bg-[#0c0c0c] p-4 font-mono text-tiny h-48 flex flex-col justify-end relative overflow-hidden group">
            <button 
              onClick={handleGrind} 
              className="absolute top-4 right-4 text-dim hover:text-accent transition-colors"
              title="The Grind"
            >
              <Terminal size={14} />
            </button>
            <div className="text-muted mb-2">$ ./grind</div>
            
            <div className="flex flex-col gap-1 min-h-[80px] justify-end">
              {grindState === 'idle' && <div className="text-dim opacity-0 group-hover:opacity-100 transition-opacity">Click terminal icon...</div>}
              {(grindState === 'solving' || grindState === 'compiling' || grindState === 'wrong' || grindState === 'accepted') && <div>{'>'} solving problem...</div>}
              {(grindState === 'compiling' || grindState === 'wrong' || grindState === 'accepted') && <div>{'>'} compiling...</div>}
              {(grindState === 'wrong' || grindState === 'accepted') && grindState === 'wrong' && <div className="text-red-400 flex items-center gap-2">{'>'} wrong answer. <X size={12}/></div>}
              {grindState === 'wrong' && <div className="mt-2">{'>'} again.</div>}
              {grindState === 'accepted' && <div className="text-green-400 flex items-center gap-2">{'>'} accepted. <Check size={12}/></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCode;
