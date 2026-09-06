import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const groups = [
  {
    label: "Linguagens",
    items: ["C", "Python", "JavaScript"],
    accent: "var(--color-cyan)",
  },
  {
    label: "Dev & Infra",
    items: ["React", "Docker"],
    accent: "var(--color-indigo)",
  },
  {
    label: "UI/UX Design",
    items: ["Figma", "Canva", "Photoshop", "UI/UX Design"],
    accent: "var(--color-magenta)",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 max-w-5xl mx-auto">
      <SectionHeading eyebrow="// skills" title="Com o que eu trabalho" />
      <div className="grid sm:grid-cols-3 gap-6">
        {groups.map((g, gi) => (
          <Reveal key={g.label} delay={gi * 0.1}>
            <div className="glass-card rounded-2xl p-8 h-full">
              <h3
                className="font-display font-semibold text-xl mb-5"
                style={{ color: g.accent }}
              >
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-sm rounded-lg border px-3 py-1.5"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
