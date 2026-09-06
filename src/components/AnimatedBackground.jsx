import ParticleNetwork from "./ParticleNetwork";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-[var(--color-bg)]">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <ParticleNetwork />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--color-bg) 92%)",
        }}
      />
    </div>
  );
}
