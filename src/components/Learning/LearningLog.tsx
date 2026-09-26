import { useState } from 'react';
import { learningTracks, learningEvolution } from '../../data/learning';

const LearningLog = () => {
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const backendTopics = ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Authentication', 'Backend Architecture', 'Deployment', 'Docker'];

  return (
    <section id="learning" className="section container border-t">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <h2 className="font-mono text-tiny text-muted mb-4">HOW I BUILT THE FOUNDATION</h2>
        <p className="font-serif text-small text-dim italic">
          Continuous learning mapped across data science, algorithms, and backend architecture.
        </p>
      </div>

      {/* Evolution Timeline — connects all learning */}
      <div className="mb-20 border border-[#27272a] bg-[#0a0a0a] p-8 overflow-x-auto">
        <div className="font-mono text-[10px] text-muted mb-6">LEARNING EVOLUTION</div>
        <div className="flex items-center gap-2 min-w-max">
          {learningEvolution.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-2">
              <div 
                className="px-4 py-2 border border-[#27272a] bg-[#111] font-mono text-tiny text-dim hover:border-accent hover:text-white transition-colors cursor-default"
                onMouseEnter={() => setHoveredStage(step.source)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {step.label}
              </div>
              {idx < learningEvolution.length - 1 && (
                <span className="font-mono text-dim text-[10px]">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {learningTracks.map((track, idx) => {
          const isExpanded = expandedTrack === track.id;
          const isHighlighted = hoveredStage === track.id;
          
          return (
            <div 
              key={track.id} 
              className={`border bg-[#0c0c0c] p-8 relative overflow-hidden transition-all duration-500 cursor-pointer ${
                isHighlighted ? 'border-accent' : 'border-[#27272a] hover:border-[#3f3f46]'
              }`}
              onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
            >
              {/* Background Number */}
              <div className={`absolute top-0 right-0 p-4 font-mono text-[120px] leading-none select-none transition-colors duration-700 ${
                isHighlighted ? 'text-accent opacity-20' : 'text-[#27272a] opacity-10'
              }`}>
                0{idx + 1}
              </div>

              <div className="relative z-10">
                {/* Meta badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="font-mono text-[10px] text-accent border border-[#27272a] px-2 py-1 bg-[#111]">
                    {track.duration}
                  </span>
                  {track.lectures && (
                    <span className="font-mono text-[10px] text-dim border border-[#27272a] px-2 py-1 bg-[#111]">
                      {track.lectures}
                    </span>
                  )}
                  <span className={`font-mono text-[10px] px-2 py-1 border ${
                    track.type === 'paid' ? 'border-yellow-900 text-yellow-500 bg-yellow-500/5' : 'border-green-900 text-green-500 bg-green-500/5'
                  }`}>
                    {track.type === 'paid' ? 'PAID' : 'FREE'} {track.platform && `/ ${track.platform.toUpperCase()}`}
                  </span>
                </div>
                
                {/* Title & Provider */}
                <h3 className="font-sans text-body font-bold text-white mb-1">{track.title}</h3>
                <div className="font-mono text-[10px] text-muted mb-4">{track.provider}</div>
                <p className="font-serif text-small text-dim italic mb-6">{track.description}</p>
                
                {/* Backend focus emphasis for Hitesh course */}
                {track.primaryFocus && (
                  <div className="mb-6 border border-accent bg-accent/5 p-3">
                    <div className="font-mono text-[10px] text-accent mb-2">PRIMARY FOCUS</div>
                    <div className="font-sans text-small font-bold text-white">{track.primaryFocus}</div>
                  </div>
                )}

                {/* Focus Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {track.focus.map(f => (
                    <span key={f} className={`font-mono text-[10px] px-2 py-1 border transition-colors ${
                      backendTopics.includes(f)
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-[#27272a] text-muted bg-[#111]'
                    }`}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Expanded: Learning Journey / Pipeline */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#27272a]">
                    <div className="font-mono text-[10px] text-muted mb-4">LEARNING PATH</div>
                    <div className="flex items-center flex-wrap gap-2">
                      {track.journey.map((stage, jIdx) => (
                        <div key={stage} className="flex items-center gap-2">
                          <div className="font-mono text-tiny text-white bg-[#111] border border-[#27272a] px-3 py-1">
                            {stage}
                          </div>
                          {jIdx < track.journey.length - 1 && (
                            <span className="text-accent font-mono text-[10px]">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Link */}
                <a 
                  href={track.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-6 font-mono text-tiny text-dim hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  [VIEW SOURCE ↗]
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Learning Hours Summary */}
      <div className="mt-16 border border-[#27272a] bg-[#0a0a0a] p-8">
        <div className="font-mono text-[10px] text-muted mb-6">COURSE / RESOURCE DURATIONS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {learningTracks.map(track => (
            <div key={track.id} className="text-center p-4 border border-[#27272a] bg-[#111]">
              <div className="font-sans text-heading font-bold text-accent mb-1">{track.duration}</div>
              <div className="font-mono text-[10px] text-dim">{track.provider}</div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[10px] text-dim mt-4 text-right italic">
          These are course/resource durations, not personal hours watched.
        </div>
      </div>
    </section>
  );
};

export default LearningLog;
