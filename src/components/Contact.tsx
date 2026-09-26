import { profile } from '../data/profile';

const Contact = () => {
  return (
    <section className="section container border-t min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-2xl">
        <h2 className="text-display mb-12">
          IF YOU'RE BUILDING SOMETHING<br/>
          WORTH BUILDING, <span className="text-accent">TALK TO ME.</span>
        </h2>
        
        <div className="flex flex-col gap-6 font-mono text-small">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group w-max">
            <span className="text-dim group-hover:text-white transition-colors">EMAIL</span>
            <span className="group-hover:text-accent transition-colors">→ {profile.email}</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-max">
            <span className="text-dim group-hover:text-white transition-colors">LINKEDIN</span>
            <span className="group-hover:text-accent transition-colors">→ anunay-naman</span>
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-max">
            <span className="text-dim group-hover:text-white transition-colors">GITHUB</span>
            <span className="group-hover:text-accent transition-colors">→ jackyhitter</span>
          </a>
        </div>
        
        <div className="mt-16">
          <a href={`mailto:${profile.email}`} className="inline-block border border-[#27272a] px-8 py-4 font-mono text-tiny hover:border-accent hover:bg-accent hover:text-white transition-all">
            [ SEND A MESSAGE ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
