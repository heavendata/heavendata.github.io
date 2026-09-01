// Build the dark-mode logo from the light one by recolouring the "heaven"
// wordmark from the brand navy to white. The "data" half and the hexagon icon
// are brand blue and stay as they are.
//
// Safe as an exact-colour swap because the source palette is clean: the navy
// rgb(16,16,58) appears only in x 417-1291 (the "heaven" wordmark), the icon
// occupies x 7-304, and the wordmark is antialiased through the alpha channel
// rather than through colour blends — so there are no intermediate navy tones to
// leave behind.
import sharp from 'sharp';

const SRC = 'src/assets/heavendata-logo.png';
const OUT = 'src/assets/heavendata-logo-dark.png';
const FROM = [16, 16, 58];
const TO = [255, 255, 255];

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

let swapped = 0;
let strays = 0;
for (let i = 0; i < data.length; i += 4) {
  if (data[i + 3] < 1) continue;
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  if (r === FROM[0] && g === FROM[1] && b === FROM[2]) {
    [data[i], data[i + 1], data[i + 2]] = TO;
    swapped++;
  } else if (r < 120 && g < 120 && b < 160 && r + g + b < 260) {
    // Any other dark pixel would also vanish on a dark background. There should
    // be none; fail loudly rather than ship a half-invisible logo.
    strays++;
  }
}

if (strays > 0) throw new Error(`${strays} dark pixels are not the known navy — inspect before shipping`);

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`recoloured ${swapped} px  ${FROM.join(',')} -> ${TO.join(',')}`);
console.log(`wrote ${OUT} (${info.width}x${info.height})`);
