import { useState } from 'react';

const concepts = [
  { id: 'ds', label: 'DATA SCIENCE', desc: 'Finding the shape of the problem.' },
  { id: 'ml', label: 'MACHINE LEARNING', desc: 'Teaching systems to recognize the shape.' },
  { id: 'cv', label: 'COMPUTER VISION', desc: 'Giving systems the ability to see it.' },
  { id: 'be', label: 'BACKEND', desc: 'Building the infrastructure to support it.' },
  { id: 'sys', label: 'SYSTEMS', desc: 'Making sure the entire thing actually works.' }
];

const About = () => {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);

  return (
    <section id="about" className="section container border-t">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: System Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2 className="font-mono text-tiny text-muted mb-12">SYSTEMS & PHILOSOPHY</h2>
          
          <p className="font-serif text-heading italic mb-16 text-dim">
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

        {/* Right Side: Education & Foundation */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#27272a] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <h2 className="font-mono text-tiny text-muted mb-8 border-b border-[#27272a] pb-4">FOUNDATION</h2>
          
          <div className="mb-12">
            <h3 className="font-sans text-small text-white mb-2">Punjab Engineering College</h3>
            <div className="font-mono text-tiny text-dim mb-1">B.Tech • 2024–2028</div>
            <div className="font-mono text-tiny text-accent">Minor: Data Science</div>
          </div>

          <div>
            <h3 className="font-sans text-small text-white mb-4">Data Science Minor Curriculum</h3>
            <ul className="font-mono text-tiny text-dim flex flex-col gap-3">
              <li className="flex justify-between border-b border-[#27272a] pb-2">
                <span>Python for Data Science</span>
                <span className="text-accent">A+</span>
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
             <div className="font-mono text-tiny text-dim mb-2">Introduction to Machine Learning (IIT Madras)</div>
             <div className="inline-block border border-accent text-accent px-2 py-1 font-mono text-[10px]">
               NATIONAL TOP 2%
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
