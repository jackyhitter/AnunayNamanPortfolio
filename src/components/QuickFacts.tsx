import { experience } from '../data/experience';
import { achievements } from '../data/achievements';

const QuickFacts = () => {
  return (
    <section className="section container border-t">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-mono text-tiny text-muted mb-4">EDUCATION</h3>
          <div className="font-sans text-small">
            <p>{experience.education.degree}</p>
            <p className="text-muted">{experience.education.university}</p>
            <p className="text-dim mt-1">{experience.education.period}</p>
            <p className="text-dim mt-4">Minor: {experience.education.minor}</p>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-tiny text-muted mb-4">EXPERIENCE</h3>
          <div className="flex flex-col gap-4">
            {experience.roles.map((role, idx) => (
              <div key={idx} className="font-sans text-small">
                <p>{role.title}</p>
                <p className="text-muted">{role.company}</p>
                <p className="text-dim mt-1">{role.period}</p>
                {role.description && <p className="text-dim mt-1 text-xs">{role.description}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-tiny text-muted mb-4">VERIFIED DATA</h3>
          <ul className="font-sans text-small flex flex-col gap-2">
            {achievements.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-4 border-b border-[#27272a] pb-2 last:border-0">
                <span className="text-accent opacity-50">{(idx + 1).toString().padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuickFacts;
