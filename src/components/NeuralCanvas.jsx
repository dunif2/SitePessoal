import { useEffect, useRef } from "react";

// Lightweight animated "neural globe": points on a rotating sphere,
// connected by lines when close enough, reacting subtly to mouse position.
export default function NeuralCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf;
    let width, height, dpr;
    const points = [];
    const COUNT = 70;
    const RADIUS = 0.9;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Generate points on a sphere (fibonacci sphere distribution)
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) * Math.PI) * i;
      points.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
      });
    }

    let angle = 0;

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    }
    if (!reduceMotion) canvas.addEventListener("mousemove", onMove);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * RADIUS * 0.42;

      if (!reduceMotion) angle += 0.0022 + mouse.current.x * 0.003;
      const tiltTarget = mouse.current.y * 0.6;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(tiltTarget);
      const sinT = Math.sin(tiltTarget);

      const projected = points.map((p) => {
        // rotate around Y
        let x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        let y = p.y;
        // tilt around X
        let y2 = y * cosT - z * sinT;
        let z2 = y * sinT + z * cosT;

        const depth = (z2 + 1.4) / 2.4;
        return {
          x: cx + x * scale,
          y: cy + y2 * scale,
          depth,
        };
      });

      // connections between nearby points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < scale * 0.42) {
            const opacity = (1 - dist / (scale * 0.42)) * 0.25 * Math.min(a.depth, b.depth);
            ctx.strokeStyle = `rgba(73, 242, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // points
      projected.forEach((p) => {
        const r = 1.2 + p.depth * 1.8;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.depth > 0.6 ? "184,41,255" : "73,242,255"}, ${0.35 + p.depth * 0.6})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
}
