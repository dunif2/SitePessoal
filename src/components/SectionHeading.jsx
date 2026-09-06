import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="font-mono text-sm text-[var(--color-cyan)] mb-2 tracking-wide neon-text-glow">
        {eyebrow}
      </p>
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
