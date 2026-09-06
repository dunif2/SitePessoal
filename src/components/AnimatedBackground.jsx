import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";

// One accent per section, so the ambient glow shifts as you scroll — the
// background reads as "moving between topics" instead of a static wallpaper.
// Colors cycle indigo -> cyan -> magenta -> emerald so neighbors never repeat.
const SECTION_ACCENTS = {
  hero: "indigo",
  sobre: "cyan",
  skills: "magenta",
  projetos: "emerald",
  experiencia: "indigo",
  contato: "cyan",
};

const ACCENT_CHANNELS = {
  indigo: [111, 0, 255],
  cyan: [73, 242, 255],
  magenta: [184, 41, 255],
  emerald: [52, 211, 153],
};

export default function AnimatedBackground() {
  const [activeAccent, setActiveAccent] = useState("indigo");
  const [glowR, glowG, glowB] = ACCENT_CHANNELS[activeAccent];
  const [scrollY, setScrollY] = useState(0);

  // Track which section is centered in the viewport and tint the background
  // to that section's accent color (soft crossfade via opacity, not by
  // interpolating the gradient itself — that isn't reliably animatable).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a
        );
        const accent = SECTION_ACCENTS[mostVisible.target.id];
        if (accent) setActiveAccent(accent);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Subtle parallax so the grid layer visibly shifts as the page scrolls,
  // instead of feeling pinned in place behind the content.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-[var(--color-bg)]">
      {/* subtle grid, drifting slowly with scroll for a sense of depth */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      />

      {/* per-section ambient glow: a single layer whose color channels ease
          toward the active section's accent (registered via @property so the
          browser can tween the numbers, instead of stacking one layer per
          color — cheap on the compositor even with the glass-card blur above it) */}
      <div
        className="absolute inset-0"
        style={{
          "--glow-r": glowR,
          "--glow-g": glowG,
          "--glow-b": glowB,
          transition:
            "--glow-r 1400ms ease-out, --glow-g 1400ms ease-out, --glow-b 1400ms ease-out",
          background:
            "radial-gradient(circle at 50% 32%, rgba(var(--glow-r), var(--glow-g), var(--glow-b), 0.16), transparent 62%)",
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
