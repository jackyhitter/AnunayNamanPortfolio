import { skills, techStackRelationships } from '../data/skills';

const Skills = () => {
  return (
    <section className="section container border-t">
      <h2 className="font-mono text-tiny text-muted mb-12">THINGS I'M FIGURING OUT</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        {Object.values(skills).map(category => (
          <div key={category.title}>
            <div className="flex justify-between items-center mb-6 border-b border-[#27272a] pb-2">
              <h3 className="font-mono text-small">{category.title}</h3>
              <span className="font-mono text-tiny text-accent opacity-70">[{category.status}]</span>
            </div>
            <ul className="grid grid-cols-2 gap-y-3 font-sans text-small text-muted">
              {category.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-[#27272a] p-8 md:p-12 relative group">
        <h3 className="font-mono text-tiny text-dim mb-8">TECH STACK / RELATIONSHIPS</h3>
        <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-small">
          {techStackRelationships.map(tech => (
            <div key={tech.name} className="relative cursor-crosshair group/tech">
              <span className="group-hover/tech:text-accent transition-colors">{tech.name}</span>
              <div className="absolute top-full left-0 mt-2 p-2 border border-[#27272a] bg-black text-tiny text-muted whitespace-nowrap opacity-0 group-hover/tech:opacity-100 pointer-events-none transition-opacity z-10">
                → {tech.links.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
