import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ParticleNetwork from "./ParticleNetwork";

// Layered parallax background: three depths drifting at different fractions
// of scroll progress, so the page reads as having real depth instead of a
// flat, pinned wallpaper.
//
//   Layer 1 (deep)  — soft neon light blobs + grid, barely moves.
//   Layer 2 (mid)   — ParticleNetwork's ambient "stardust", drifts a bit more.
//   Layer 3 (front) — the actual page content in App.jsx, scrolls normally.
//
// The ranges are bounded (tens/hundreds of px, not raw scroll pixels) rather
// than a literal "scrollY * factor": with a fixed background, an unbounded
// multiplier eventually drags the layer fully out of frame on a long page,
// which would empty out the background well before the user reaches the
// footer. Mapping scrollYProgress (0-1 across the whole document) to a small
// fixed range keeps the "layers move at different speeds" illusion for the
// entire scroll, in every browser, regardless of how tall the page grows.
export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const yDeep = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -90]
  );
  const yMid = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -220]
  );

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-[var(--color-bg)]">
      {/* Layer 1 — deep background: grid + slow-drifting neon blobs */}
      <motion.div
        style={{ y: yDeep, willChange: "transform" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="absolute -top-[15%] -left-[10%] w-[60vmax] h-[60vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(73,242,255,0.24), transparent 70%)",
          }}
        />
        <div
          className="absolute top-[18%] -right-[18%] w-[70vmax] h-[70vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(111,0,255,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[12%] left-[2%] w-[62vmax] h-[62vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184,41,255,0.24), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Layer 2 — mid depth: ambient particle "stardust" */}
      <motion.div
        style={{ y: yMid, willChange: "transform" }}
        className="absolute inset-0 pointer-events-none"
      >
        <ParticleNetwork />
      </motion.div>

      {/* vignette — static, just darkens the edges */}
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
