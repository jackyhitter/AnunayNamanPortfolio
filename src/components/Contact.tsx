import { useState } from 'react';
import { profile } from '../data/profile';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      // In a real implementation, you would send this to your backend
      console.log('Resume access granted for:', email);
      setUnlocked(true);
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section id="contact" className="section container border-t mb-32">
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <h2 className="font-code text-tiny mb-6" style={{ color: 'var(--text-muted)' }}>LET'S BUILD SOMETHING</h2>
        <p className="font-serif text-body italic mb-12" style={{ color: 'var(--text-muted)' }}>
          For research, ML, backend, creative coding, or interesting systems.
        </p>

        <div className="flex flex-wrap justify-center gap-4 font-mono text-tiny mb-8">
          <a href={`mailto:${profile.email}`} className="border border-[#27272a] bg-[#0c0c0c] px-6 py-3 hover:border-accent hover:text-white transition-colors">
            [EMAIL]
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="border border-[#27272a] bg-[#0c0c0c] px-6 py-3 hover:border-accent hover:text-white transition-colors">
            [GITHUB]
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="border border-[#27272a] bg-[#0c0c0c] px-6 py-3 hover:border-accent hover:text-white transition-colors">
            [LINKEDIN]
          </a>
          <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="border border-[#27272a] bg-[#0c0c0c] px-6 py-3 hover:border-accent hover:text-white transition-colors">
            [LEETCODE]
          </a>
        </div>

        {/* Resume Gate */}
        <div className="mt-4">
          {!showForm && !unlocked ? (
            <button 
              onClick={() => setShowForm(true)}
              className="border border-accent text-accent bg-[#0c0c0c] px-8 py-4 font-mono text-small hover:bg-accent hover:text-white transition-colors shadow-[0_0_15px_rgba(37,99,235,0.1)]"
            >
              [ VIEW RESUME ]
            </button>
          ) : unlocked ? (
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-green-500 text-green-500 bg-[#0c0c0c] px-8 py-4 font-mono text-small hover:bg-green-500 hover:text-white transition-colors inline-block"
            >
              [ RESUME UNLOCKED ↗ ]
            </a>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="font-mono text-[10px] text-dim">Please provide your email to access the resume:</div>
              <div className="flex border border-accent bg-[#0c0c0c]">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required
                  className="bg-transparent border-none outline-none text-white font-mono text-tiny px-4 py-3 w-64 placeholder:text-[#3f3f46]"
                />
                <button type="submit" className="bg-accent text-white font-mono text-tiny px-6 hover:bg-blue-600 transition-colors">
                  OPEN
                </button>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="font-mono text-[10px] text-muted hover:text-white mt-2">
                [CANCEL]
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
