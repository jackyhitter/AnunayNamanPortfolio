//

const CurrentlyBuilding = () => {
  const currentWork = [
    { id: '01', title: 'LA PEACE', desc: 'City-scale ANPR / trajectory intelligence', status: 'BUILDING' },
    { id: '02', title: 'ML / RESEARCH', desc: 'Experiments and model work', status: 'EXPERIMENTING' },
    { id: '03', title: 'DSA', desc: 'Daily algorithm practice', status: 'LEARNING' },
    { id: '04', title: 'BACKEND', desc: 'Building stronger API/system design skills', status: 'BUILDING' },
  ];

  return (
    <section className="section container border-t">
      <h2 className="font-mono text-tiny text-muted mb-12">CURRENTLY BUILDING</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentWork.map(work => (
          <div key={work.id} className="p-6 border border-[#27272a] bg-[#0c0c0c] hover:border-accent transition-colors flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="font-mono text-tiny text-dim mb-4">{work.id}</div>
              <h3 className="font-sans text-small mb-2 font-medium">{work.title}</h3>
              <p className="font-serif text-small text-muted">{work.desc}</p>
            </div>
            <div className="font-mono text-tiny text-accent mt-6">
              [{work.status}]
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
