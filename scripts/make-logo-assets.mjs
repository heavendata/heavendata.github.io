// Regenerates the two logo assets that are derived from src/assets/heavendata-logo.png.
// Run after replacing that file:  node scripts/make-logo-assets.mjs
//
//   src/assets/heavendata-logo-dark.png   the wordmark with "heaven" in white
//   public/favicon.png                    the hexagon icon alone, square
//
// Both are generated rather than hand-edited so they cannot drift from the source
// logo, and so a future logo change is one command rather than an archaeology
// exercise.
import sharp from 'sharp';

const SRC = 'src/assets/heavendata-logo.png';
const DARK_OUT = 'src/assets/heavendata-logo-dark.png';
const ICON_OUT = 'public/favicon.png';

const NAVY = [16, 16, 58]; // the brand navy the word "heaven" is set in
const WHITE = [255, 255, 255];
const ICON_SIZE = 512;
const ICON_PADDING = 0.08; // fraction of the icon's longest side, per side

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const alphaAt = (x, y) => data[(y * W + x) * 4 + 3];

// ---------------------------------------------------------------- dark wordmark
// An exact-colour swap is safe because the source palette is clean: the navy
// appears only in the wordmark, and the glyphs are antialiased through the alpha
// channel rather than through colour blends, so there are no intermediate navy
// tones left behind as a fringe.
const dark = Buffer.from(data);
let swapped = 0;
let strays = 0;
for (let i = 0; i < dark.length; i += 4) {
  if (dark[i + 3] < 1) continue;
  const [r, g, b] = [dark[i], dark[i + 1], dark[i + 2]];
  if (r === NAVY[0] && g === NAVY[1] && b === NAVY[2]) {
    [dark[i], dark[i + 1], dark[i + 2]] = WHITE;
    swapped++;
  } else if (r < 120 && g < 120 && b < 160 && r + g + b < 260) {
    strays++; // would also vanish on a dark background
  }
}
if (strays > 0) throw new Error(`${strays} dark pixels are not the known navy — inspect before shipping`);

await sharp(dark, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(DARK_OUT);
console.log(`${DARK_OUT}: recoloured ${swapped} px ${NAVY.join(',')} -> white`);

// ----------------------------------------------------------------------- favicon
// Find the icon by locating the first wide run of empty columns: the logo is
// [hexagon][gap][wordmark], so everything left of that gap is the icon.
const occupied = new Array(W).fill(false);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (alphaAt(x, y) >= 16) occupied[x] = true;

let gapStart = -1;
let iconRight = -1;
for (let x = 0; x < W; x++) {
  if (!occupied[x]) {
    if (gapStart < 0) gapStart = x;
  } else {
    if (gapStart >= 0 && x - gapStart >= 8) { iconRight = gapStart - 1; break; }
    gapStart = -1;
  }
}
if (iconRight < 0) throw new Error('could not separate the icon from the wordmark');

let x0 = W, x1 = -1, y0 = H, y1 = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x <= iconRight; x++) {
    if (alphaAt(x, y) < 16) continue;
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
}

const w = x1 - x0 + 1;
const h = y1 - y0 + 1;

// sharp runs resize BEFORE extend regardless of the order these are called in, so
// this is written to suit that: fit the icon into a smaller square (aspect ratio
// preserved, transparent letterboxing), then extend that square by the margin.
// Calling extend first and resizing after silently produces a non-square image.
const margin = Math.round(ICON_SIZE * ICON_PADDING);
const inner = ICON_SIZE - margin * 2;
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

await sharp(SRC)
  .extract({ left: x0, top: y0, width: w, height: h })
  .resize({ width: inner, height: inner, fit: 'contain', background: transparent })
  .extend({ top: margin, bottom: margin, left: margin, right: margin, background: transparent })
  .png({ compressionLevel: 9 })
  .toFile(ICON_OUT);

const out = await sharp(ICON_OUT).metadata();
if (out.width !== ICON_SIZE || out.height !== ICON_SIZE) {
  throw new Error(`favicon is ${out.width}x${out.height}, expected ${ICON_SIZE}x${ICON_SIZE}`);
}
console.log(`${ICON_OUT}: icon x ${x0}-${x1} y ${y0}-${y1} (${w}x${h}) -> ${out.width}x${out.height}`);
