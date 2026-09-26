import { useState } from 'react';

type SkillCluster = {
  id: string;
  label: string;
  color: string;
  skills: string[];
  connections: string[]; // IDs of related clusters
};

const clusters: SkillCluster[] = [
  {
    id: 'ml',
    label: 'MACHINE LEARNING',
    color: '#3b82f6',
    skills: ['Python', 'NumPy', 'Pandas', 'Polars', 'Scikit-learn', 'CatBoost', 'XGBoost', 'Computer Vision', 'OpenCV', 'YOLO'],
    connections: ['ds', 'sys']
  },
  {
    id: 'ds',
    label: 'DATA SCIENCE',
    color: '#8b5cf6',
    skills: ['Python', 'Pandas', 'Statistics', 'EDA', 'Feature Engineering', 'Model Evaluation', 'Jupyter', 'Visualization'],
    connections: ['ml', 'be']
  },
  {
    id: 'be',
    label: 'BACKEND',
    color: '#10b981',
    skills: ['Node.js', 'Express', 'FastAPI', 'Flask', 'REST APIs', 'MongoDB', 'PostgreSQL', 'PostGIS', 'Authentication'],
    connections: ['sys', 'ds']
  },
  {
    id: 'sys',
    label: 'SYSTEMS',
    color: '#f59e0b',
    skills: ['Docker', 'Git', 'GitHub', 'Linux', 'APIs', 'Databases', 'Deployment', 'CI/CD'],
    connections: ['be', 'ml']
  },
  {
    id: 'algo',
    label: 'ALGORITHMS',
    color: '#ef4444',
    skills: ['C++', 'DSA', 'Trees', 'Graphs', 'Dynamic Programming', 'Binary Search', 'Greedy', 'Problem Solving'],
    connections: ['ml', 'sys']
  },
  {
    id: 'fe',
    label: 'FRONTEND',
    color: '#06b6d4',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'HTML', 'CSS', 'Three.js', 'GSAP'],
    connections: ['be']
  }
];

// Language tree
const languageTree = [
  { lang: 'Python', branches: ['ML', 'Data Science', 'Backend', 'Computer Vision'] },
  { lang: 'C++', branches: ['Algorithms', 'DSA', 'Competitive Programming'] },
  { lang: 'JavaScript/TS', branches: ['Frontend', 'Backend (Node)', 'Interfaces'] },
];

const SkillMap = () => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const activeData = clusters.find(c => c.id === activeCluster);

  return (
    <section id="skills" className="section container border-t">
      <div className="mb-16 max-w-2xl">
        <h2 className="font-mono text-tiny text-muted mb-4">SYSTEM MAP</h2>
        <p className="font-serif text-small text-dim italic">
          Skills organized as interconnected systems, not a flat list.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Cluster Selection */}
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-2">
            {clusters.map(cluster => (
              <button
                key={cluster.id}
                onClick={() => setActiveCluster(activeCluster === cluster.id ? null : cluster.id)}
                className={`text-left px-6 py-4 border transition-all duration-300 group relative overflow-hidden ${
                  activeCluster === cluster.id
                    ? 'bg-[#111] text-white'
                    : 'bg-[#0a0a0a] text-muted hover:text-white'
                }`}
                style={{ borderColor: activeCluster === cluster.id ? cluster.color : '#27272a' }}
              >
                {activeCluster === cluster.id && (
                  <div className="absolute inset-0 opacity-5" style={{ backgroundColor: cluster.color }} />
                )}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="font-mono text-tiny">{cluster.label}</span>
                  <span className="font-mono text-[10px] text-dim">{cluster.skills.length} SKILLS</span>
                </div>
              </button>
            ))}
          </div>

          {/* Language Tree */}
          <div className="mt-12 border border-[#27272a] bg-[#0a0a0a] p-6">
            <div className="font-mono text-[10px] text-muted mb-4">LANGUAGE → DOMAIN</div>
            {languageTree.map(item => (
              <div key={item.lang} className="mb-4 last:mb-0">
                <div className="font-mono text-tiny text-white mb-1">{item.lang}</div>
                <div className="flex flex-col gap-1 ml-4">
                  {item.branches.map(b => (
                    <div key={b} className="font-mono text-[10px] text-dim flex items-center gap-2">
                      <span className="text-[#27272a]">├──</span> {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skill Detail */}
        <div className="lg:col-span-8">
          <div className="bg-[#0c0c0c] border border-[#27272a] p-8 min-h-[500px] relative overflow-hidden">
            {activeData ? (
              <>
                <div className="absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: activeData.color }} />
                
                <div className="font-mono text-[10px] mb-6 pb-4 border-b border-[#27272a]" style={{ color: activeData.color }}>
                  {activeData.label}
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                  {activeData.skills.map(skill => (
                    <div key={skill} className="px-4 py-2 border border-[#27272a] bg-[#111] font-mono text-tiny text-white hover:border-accent transition-colors cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Connected clusters */}
                <div className="border-t border-[#27272a] pt-6">
                  <div className="font-mono text-[10px] text-muted mb-3">CONNECTS TO</div>
                  <div className="flex gap-3">
                    {activeData.connections.map(connId => {
                      const conn = clusters.find(c => c.id === connId);
                      return conn ? (
                        <button
                          key={connId}
                          onClick={() => setActiveCluster(connId)}
                          className="font-mono text-tiny px-3 py-1 border border-[#27272a] text-dim hover:text-white transition-colors"
                        >
                          → {conn.label}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="font-mono text-tiny text-dim mb-4">SELECT A CLUSTER</div>
                  <div className="font-serif text-small text-muted italic">
                    Skills are organized as interconnected systems.<br />
                    Click a cluster to explore its technologies.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillMap;
