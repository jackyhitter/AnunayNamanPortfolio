//

const About = () => {
  return (
    <section id="about" className="section container">
      <div className="max-w-2xl font-serif text-heading leading-relaxed">
        <p className="mb-6">
          I study Civil Engineering at Punjab Engineering College,<br/>
          but most of my curiosity lives elsewhere.
        </p>
        
        <div className="font-mono text-small text-muted my-12 pl-4 border-l border-[#27272a] flex flex-col gap-2">
          <span>Civil Engineering</span>
          <span className="ml-2">↓</span>
          <span>Data Science</span>
          <span className="ml-2">↓</span>
          <span className="text-white">Machine Learning</span>
          <span className="ml-2">↓</span>
          <span className="text-white">Backend</span>
          <span className="ml-2">↓</span>
          <span className="text-accent">Systems</span>
        </div>

        <p className="mb-6">
          I like understanding systems deeply enough to rebuild them, 
          then breaking them again to see where they fail.
        </p>
        
        <p className="text-body text-muted font-sans mt-12 max-w-lg">
          I work with Python and C++ most heavily, and I'm building toward stronger backend and ML engineering. This is a story of transition rather than something to hide.
        </p>
      </div>
    </section>
  );
};

export default About;
