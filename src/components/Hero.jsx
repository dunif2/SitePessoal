import { useState, useEffect, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import photo from "../assets/ricardo-photo.jpg";

// Three.js is a heavy dependency (~700KB) that only the Hero needs, so it's
// code-split out of the main bundle and only fetched once the Hero mounts.
const Beams = lazy(() => import("./Beams"));

const COMMAND = "whoami";
const NAME = "Ricardo Pereira Marccelli Filho";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i === COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 400);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Beams background — scoped to the Hero section only (absolute, not
          fixed): once you scroll past it, the regular AnimatedBackground
          (grid + particles) takes over for the rest of the page, which is
          the "divisa" between the two. Skipped entirely under
          prefers-reduced-motion instead of running the WebGL animation. */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Suspense fallback={null}>
            <Beams
              beamWidth={2}
              beamHeight={15}
              beamNumber={8}
              lightColor="#49F2FF"
              beamColor="#120a24"
              backgroundColor="#0A0A0C"
              speed={1.5}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={15}
            />
          </Suspense>
          {/* scrim so the name/buttons stay readable over the beams,
              especially on narrow/tall viewports where they fill more of
              the frame */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.6) 75%, rgba(10,10,12,0.75) 100%)",
            }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-6"
      >
        <div
          className="absolute -inset-1.5 rounded-full opacity-60 blur-md"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-cyan), var(--color-indigo), var(--color-magenta), var(--color-cyan))",
          }}
        />
        <img
          src={photo}
          alt="Retrato de Ricardo Pereira Marccelli Filho"
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
          style={{
            border: "2px solid var(--color-bg)",
            filter: "grayscale(0.15) contrast(1.05)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-full px-4 py-1.5 mb-6 flex items-center gap-2 font-mono text-xs"
      >
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--color-emerald)" }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(52,211,153,0.6)",
              "0 0 8px rgba(73,242,255,0.9)",
              "0 0 0px rgba(52,211,153,0.6)",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        Disponível para estágios em TI
      </motion.div>

      <div className="glass-card rounded-xl px-5 py-2 mb-8 font-mono text-sm text-[var(--color-cyan)]">
        <span className="text-[var(--color-text-muted)]">$ </span>
        {typed}
        {!showResult && <span className="animate-pulse">▌</span>}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={showResult ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-4xl gradient-text"
      >
        {NAME}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={showResult ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-6 text-lg sm:text-xl text-[var(--color-text-muted)] font-mono"
      >
        Dev em formação. Designer por curiosidade. Sempre construindo algo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={showResult ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="mt-10 flex flex-wrap gap-4 justify-center"
      >
        <a
          href="/cv-ricardo-marccelli.pdf"
          download
          className="neon-btn rounded-lg px-6 py-3 font-medium text-white transition-transform hover:scale-[1.03]"
          style={{
            background: "linear-gradient(90deg, var(--color-indigo), var(--color-magenta))",
          }}
        >
          Baixar CV (PDF)
        </a>
        <a
          href="#projetos"
          className="rounded-lg px-6 py-3 font-medium glass-card hover:border-[var(--color-cyan)] transition-colors"
        >
          Ver projetos
        </a>
      </motion.div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a seção Sobre"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 text-[var(--color-text-muted)]"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
