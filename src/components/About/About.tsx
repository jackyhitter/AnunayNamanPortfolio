import { useState, useRef, useEffect } from 'react';

const concepts = [
  { id: 'ds', label: 'DATA SCIENCE', desc: 'Finding the shape of the problem.' },
  { id: 'ml', label: 'MACHINE LEARNING', desc: 'Teaching systems to recognize the shape.' },
  { id: 'cv', label: 'COMPUTER VISION', desc: 'Giving systems the ability to see it.' },
  { id: 'be', label: 'BACKEND', desc: 'Building the infrastructure to support it.' },
  { id: 'sys', label: 'SYSTEMS', desc: 'Making sure the entire thing actually works.' }
];

const About = () => {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = cardGlowRef.current;
    if (!card || !glow) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      glow.style.background = `radial-gradient(350px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(96,165,250,0.08), transparent 70%)`;
      glow.style.opacity = '1';
    };
    const onLeave = () => { glow.style.opacity = '0'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section id="about" className="section container border-t">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: System Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2 className="font-mono text-tiny text-muted mb-12">SYSTEMS & PHILOSOPHY</h2>
          
          <p className="font-serif text-heading italic mb-16" style={{ color: 'var(--text-muted)' }}>
            "I started with curiosity about data.<br/><br/>
            That became <span className="text-white">machine learning</span>.<br/>
            Machine learning pulled me toward <span className="text-white">systems</span>.<br/>
            Systems pulled me toward <span className="text-white">backend architecture</span>.<br/><br/>
            Now I like working wherever data, models and software meet."
          </p>

          <div className="font-mono text-tiny">
            {concepts.map((concept, idx) => (
              <div 
                key={concept.id}
                className="flex items-start mb-6 group cursor-default"
                onMouseEnter={() => setHoveredConcept(concept.id)}
                onMouseLeave={() => setHoveredConcept(null)}
              >
                <div className="flex flex-col items-center mr-6 mt-1">
                  <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${hoveredConcept === concept.id ? 'bg-accent' : 'bg-[#27272a]'}`}></div>
                  {idx !== concepts.length - 1 && (
                    <div className="w-[1px] h-12 bg-[#27272a] mt-2 group-hover:bg-accent/30 transition-colors"></div>
                  )}
                </div>
                <div>
                  <div className={`transition-colors duration-300 ${hoveredConcept === concept.id ? 'text-white' : 'text-dim'}`}>
                    {concept.label}
                  </div>
                  <div className={`text-muted transition-opacity duration-300 ${hoveredConcept === concept.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                    {concept.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Education & Foundation — proximity gradient card */}
        <div ref={cardRef} className="lg:col-span-5 bg-[#0a0a0a] border border-[#27272a] p-8 relative overflow-hidden group">
          <div ref={cardGlowRef} className="proximity-glow" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-[0.03] blur-[80px] rounded-full group-hover:opacity-[0.12] transition-opacity duration-700"></div>
          
          <h2 className="font-mono text-tiny text-muted mb-8 border-b border-[#27272a] pb-4">FOUNDATION</h2>
          
          <div className="mb-12">
            <h3 className="font-sans text-small text-white mb-2">Punjab Engineering College</h3>
            <div className="font-code text-tiny mb-1" style={{ color: 'var(--text-dim)' }}>B.Tech • 2024–2028</div>
            <div className="font-code text-tiny" style={{ color: 'var(--tag-color)' }}>Minor Specialisation: Data Science Engineering</div>
          </div>

          <div>
            <h3 className="font-sans text-small text-white mb-4">Data Science Engineering Minor Curriculum</h3>
            <ul className="font-code text-tiny flex flex-col gap-3" style={{ color: 'var(--text-muted)' }}>
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Python for Data Science</span>
                <span style={{ color: 'var(--stat-color)', fontWeight: 600 }}>A+</span>
              </li>
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Machine Learning</span>
              </li>
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Statistics & Probability</span>
              </li>
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Data Analysis</span>
              </li>
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Model Building</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[#27272a]">
             <h3 className="font-sans text-small text-white mb-4">NPTEL Certification</h3>
             <div className="font-code text-tiny mb-2" style={{ color: 'var(--text-dim)' }}>Introduction to Machine Learning (IIT Madras)</div>
             <div className="inline-block border px-2 py-1 font-code text-[10px]" style={{ borderColor: 'var(--online-color)', color: 'var(--online-color)' }}>
               NATIONAL TOP 2%
             </div>
          </div>
        </div>

        <div 
          className="col-span-1 md:col-span-4 mt-8 flex justify-end cursor-help relative group/marauder h-8"
          onMouseEnter={() => {
            if (!window.sessionStorage.getItem('egg_marauder')) {
              window.dispatchEvent(new CustomEvent('easter-egg-found', { detail: { name: "Marauder's Map Egg" } }));
              window.sessionStorage.setItem('egg_marauder', 'true');
            }
          }}
        >
          <span className="font-serif text-[10px] italic opacity-0 group-hover/marauder:opacity-20 transition-opacity duration-1000 select-none pointer-events-none">
            "I solemnly swear that I am up to no good."
          </span>
        </div>

      </div>
    </section>
  );
};

export default About;
