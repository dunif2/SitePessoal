// One-off/rerunnable helper: converts the full-res Roblox UI screenshots into
// resized WebP files. The coverflow gallery only ever displays these at
// max ~460px wide, so shipping 1920x1080 PNGs (~1-1.8MB each) is pure waste.
// Run again whenever a new screenshot is dropped in src/assets/roblox-ui.
import { readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const DIR = new URL("../src/assets/roblox-ui/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const MAX_WIDTH = 900; // ~2x the largest CSS display width (460px) for retina

const files = readdirSync(DIR).filter((f) => extname(f).toLowerCase() === ".png");

for (const file of files) {
  const src = join(DIR, file);
  const dest = join(DIR, basename(file, extname(file)) + ".webp");
  const before = statSync(src).size;

  await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);

  const after = statSync(dest).size;
  console.log(
    `${file} -> ${basename(dest)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}
