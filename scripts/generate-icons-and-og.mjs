// Generates PNG favicon fallbacks (Safari/old browsers/crawlers don't reliably
// use favicon.svg) and a static Open Graph / Twitter Card image, so links to
// the site render a real preview instead of a bare title on LinkedIn/WhatsApp/X.
import { readFileSync } from "node:fs";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const svg = readFileSync(ROOT + "public/favicon.svg");

const sizes = [
  { file: "favicon-32.png", size: 32 },
  { file: "favicon-192.png", size: 192 },
  { file: "apple-touch-icon.png", size: 180 },
];

for (const { file, size } of sizes) {
  await sharp(svg)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(ROOT + "public/" + file);
  console.log("wrote", file);
}

// --- Open Graph image (1200x630), matching the site's dark/neon theme ---
const OG_W = 1200;
const OG_H = 630;
const ogSvg = `
<svg width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="38%" r="70%">
      <stop offset="0%" stop-color="#6F00FF" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#B829FF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0A0A0C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E7E9F2"/>
      <stop offset="45%" stop-color="#C7CBE0"/>
      <stop offset="75%" stop-color="#9FB8C9"/>
      <stop offset="100%" stop-color="#7C93B0"/>
    </linearGradient>
    <linearGradient id="badge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6F00FF"/>
      <stop offset="100%" stop-color="#B829FF"/>
    </linearGradient>
  </defs>

  <rect width="${OG_W}" height="${OG_H}" fill="#0A0A0C"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>

  <!-- faint grid, echoes the site background -->
  <g stroke="#F5F7FA" stroke-opacity="0.05" stroke-width="1">
    ${Array.from({ length: 22 }, (_, i) => `<line x1="${i * 56}" y1="0" x2="${i * 56}" y2="${OG_H}"/>`).join("")}
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="${OG_W}" y2="${i * 56}"/>`).join("")}
  </g>

  <circle cx="112" cy="120" r="7" fill="#34D399"/>
  <text x="140" y="129" font-family="JetBrains Mono, monospace" font-size="24" fill="#9297B5">Disponível para estágios em TI</text>

  <text x="110" y="300" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="66" fill="url(#name)">Ricardo Pereira</text>
  <text x="110" y="378" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="66" fill="url(#name)">Marccelli Filho</text>

  <text x="112" y="440" font-family="JetBrains Mono, monospace" font-size="28" fill="#49F2FF">Dev em formação. Designer por curiosidade.</text>

  <rect x="110" y="490" width="150" height="56" rx="14" fill="url(#badge)"/>
  <text x="185" y="525" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="24" fill="#F5F7FA">RPMF.</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(ROOT + "public/og-image.png");
console.log("wrote og-image.png");
