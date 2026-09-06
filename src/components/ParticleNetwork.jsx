import { useEffect, useRef } from "react";

// Ambient "plexus" style particle field: dots drifting slowly, connected
// by thin lines when close, with a soft parallax reaction to the mouse.
export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf;
    let width, height, dpr;
    let particles = [];

    const DENSITY = 14000; // px^2 per particle
    const LINK_DIST = 130;
    const COLORS = ["73,242,255", "52,211,153", "184,41,255"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / DENSITY);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.3 + 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    function onLeave() {
      mouse.current.x = null;
      mouse.current.y = null;
    }
    if (!reduceMotion) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // update + draw particles
      particles.forEach((p) => {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // gentle drift away from cursor (parallax feel)
          if (mouse.current.x !== null) {
            const dx = p.x - mouse.current.x;
            const dy = p.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const force = (140 - dist) / 140;
              p.x += (dx / (dist || 1)) * force * 0.6;
              p.y += (dy / (dist || 1)) * force * 0.6;
            }
          }
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, 0.65)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // connective lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(73, 242, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
