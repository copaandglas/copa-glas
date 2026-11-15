/**
 * Renders the glass for the Aura Wall Light configurator.
 *
 *   node scripts/aura-glass/build.mjs
 *
 * Each glass is rendered twice from its sample photograph: unlit and lit. The
 * photograph supplies the texture; the colour comes from the ramps below, so
 * every colour on the page traces back to one set of values. The Corella Orange
 * ramps are measured from the studio's photographs of the Aura, lit and unlit.
 * The other three are derived from their sample photographs and should be
 * checked against the glass itself.
 *
 * Writes public/aura-glass/<id>-{off,on,swatch}.webp and
 * app/lib/aura-glass.generated.json. Uses sharp, which Next.js installs.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const OUT_DIR = path.join(root, "public/aura-glass");
const OUT_JSON = path.join(root, "app/lib/aura-glass.generated.json");

/** Pane size in the drawing is 41.4 x 113.9; rendered at three times its largest display size. */
const PANE_W = 372;
const PANE_H = 1024;
const SWATCH = 288;

/**
 * crop / swatch: [x, y, width, height] as fractions of the source photograph,
 *   chosen to avoid reflections and the edges of the sheet.
 * lit:  colour from the deepest part of the lit glass to the brightest.
 * off:  colour of the unlit glass, from shadow to the sheen on its surface.
 * texture: how strongly the photograph's texture shows, lit and unlit.
 */
const GLASSES = [
  {
    id: "amber",
    source: "corella-orange.jpg",
    crop: [0.3, 0.02, 0.349, 0.96],
    swatch: [0.34, 0.3, 0.36, 0.36],
    lit: ["#d85a02", "#ea7006", "#f6a626", "#ffdc68"],
    off: ["#330f00", "#431903", "#6b340e", "#94551f", "#cf9a5c"],
    texture: { lit: 0.16, off: 0.24 },
  },
  {
    id: "emerald",
    source: "english-muffle-sussex-green.jpg",
    crop: [0.3, 0.02, 0.349, 0.96],
    swatch: [0.3, 0.3, 0.4, 0.4],
    lit: ["#5a8527", "#7aa836", "#a6cc5c", "#d9ee9e"],
    off: ["#1a210a", "#262f10", "#3d4c1c", "#5d6e2e", "#a9b67c"],
    texture: { lit: 0.15, off: 0.24 },
  },
  {
    id: "champagne",
    // Corella is one texture in every colour. The yellow sample photograph is
    // too small to render from, so its texture is taken from another part of
    // the Corella Orange sheet.
    source: "corella-orange.jpg",
    crop: [0.63, 0.02, 0.349, 0.96],
    swatch: [0.6, 0.56, 0.36, 0.36],
    lit: ["#d6a600", "#eec010", "#f8dc52", "#fff2ae"],
    off: ["#4a2a00", "#6e4402", "#9c6a08", "#c8921a", "#f0d48a"],
    texture: { lit: 0.13, off: 0.2 },
  },
  {
    id: "red",
    source: "antique-wispy-red.jpg",
    crop: [0.22, 0.06, 0.269, 0.74],
    swatch: [0.22, 0.2, 0.42, 0.42],
    lit: ["#7a0608", "#a50f0f", "#cf2a18", "#f05e32"],
    off: ["#160102", "#240304", "#42090c", "#661a1a", "#b0605a"],
    texture: { lit: 0.2, off: 0.28 },
  },
];

/* ---------- colour ---------- */

const srgbToLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const linearToSrgb = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.max(v, 0) ** (1 / 2.4) - 0.055);

function hexToLinear(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => srgbToLinear(c / 255));
}

function linearToOklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLinear([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const toByte = (v) => Math.round(Math.min(1, Math.max(0, linearToSrgb(v))) * 255);
const linearToHex = (rgb) => "#" + rgb.map((v) => toByte(v).toString(16).padStart(2, "0")).join("");

/** A colour ramp through evenly spaced stops, blended in Oklab so the steps look even. */
function makeRamp(stops, { eased = true } = {}) {
  const labs = stops.map((hex) => linearToOklab(hexToLinear(hex)));
  return (t) => {
    const x = Math.min(1, Math.max(0, t)) * (labs.length - 1);
    const i = Math.min(labs.length - 2, Math.floor(x));
    const f = x - i;
    // Easing settles on each stop, which suits the lit glass. Unlit, the
    // tones run evenly into one another, so the ripple stays soft.
    const e = eased ? f * f * (3 - 2 * f) : f;
    return oklabToLinear(labs[i].map((v, k) => v + (labs[i + 1][k] - v) * e));
  };
}

/* ---------- texture ---------- */

/** Fine detail of the photograph, with its uneven lighting removed. Roughly -1..1. */
async function textureOf(file, [fx, fy, fw, fh], width, height) {
  const meta = await sharp(file).metadata();
  const region = {
    left: Math.round(fx * meta.width),
    top: Math.round(fy * meta.height),
    width: Math.round(fw * meta.width),
    height: Math.round(fh * meta.height),
  };
  const grey = sharp(file).extract(region).resize(width, height, { fit: "fill", kernel: "lanczos3" }).greyscale();
  // The grain of the photograph is softened: lit glass shows its ripple, not its dust.
  const fineBuf = await grey.clone().blur(0.8).raw().toBuffer();
  const midBuf = await grey.clone().blur(Math.max(width, height) / 210).raw().toBuffer();
  const softBuf = await grey.clone().blur(Math.max(width, height) / 12).raw().toBuffer();
  const detail = new Float32Array(width * height);
  // The sharpest ridges of the ripple, which catch the room's light when the glass is unlit. 0..1.
  const glint = new Float32Array(width * height);
  let sum = 0;
  let fineSum = 0;
  for (let i = 0; i < detail.length; i++) {
    glint[i] = fineBuf[i] - midBuf[i];
    detail[i] = 0.25 * glint[i] + (midBuf[i] - softBuf[i]);
    sum += detail[i] * detail[i];
    fineSum += glint[i] * glint[i];
  }
  const sd = Math.sqrt(sum / detail.length) || 1;
  const fineSd = Math.sqrt(fineSum / detail.length) || 1;
  for (let i = 0; i < detail.length; i++) {
    detail[i] = Math.max(-1, Math.min(1, detail[i] / (2.4 * sd)));
    glint[i] = Math.max(0, Math.min(1, (glint[i] / fineSd - 1.3) / 2.2));
  }
  return { detail, glint };
}

/* ---------- rendering ---------- */

/**
 * The Aura is lit from around the edge of the glass, so the lit pane is
 * brightest at its long sides and its ends and deepest in the middle.
 */
function litLevel(u, v) {
  const aspect = PANE_H / PANE_W;
  const side = Math.min(u, 1 - u);
  const end = Math.min(v, 1 - v) * aspect;
  return 0.28 + 0.7 * Math.exp(-side / 0.12) + 0.3 * Math.exp(-end / 0.14);
}

/**
 * Unlit, measured from the studio's photograph of the Aura: the glass is
 * darkest down its middle and lifts to its colour along the long sides, a
 * little more on the side nearer the light, with fine glints on the ripple.
 */
function offValue(tex, strength) {
  const aspect = PANE_H / PANE_W;
  return (u, v, i) => {
    const left = Math.exp(-u / 0.14);
    const right = Math.exp(-(1 - u) / 0.14);
    const end = Math.exp(-(Math.min(v, 1 - v) * aspect) / 0.1);
    const edge = Math.min(1, left + right);
    return (
      0.2 + 0.46 * left + 0.36 * right + 0.06 * end +
      strength * (0.4 + 0.7 * edge) * tex.detail[i] +
      (0.22 + 0.4 * edge) * tex.glint[i]
    );
  };
}

async function render(width, height, ramp, value, file) {
  const out = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const rgb = ramp(value(x / (width - 1), y / (height - 1), i));
      out[i * 3] = toByte(rgb[0]);
      out[i * 3 + 1] = toByte(rgb[1]);
      out[i * 3 + 2] = toByte(rgb[2]);
    }
  }
  await sharp(out, { raw: { width, height, channels: 3 } }).webp({ quality: 86, effort: 6 }).toFile(file);
}

await mkdir(OUT_DIR, { recursive: true });
const generated = {};

for (const glass of GLASSES) {
  const src = path.join(here, "sources", glass.source);
  const litRamp = makeRamp(glass.lit);
  const offRamp = makeRamp(glass.off, { eased: false });

  const pane = await textureOf(src, glass.crop, PANE_W, PANE_H);
  await render(PANE_W, PANE_H, offRamp, offValue(pane, glass.texture.off), path.join(OUT_DIR, `${glass.id}-off.webp`));
  await render(
    PANE_W, PANE_H, litRamp,
    (u, v, i) => litLevel(u, v) + glass.texture.lit * pane.detail[i],
    path.join(OUT_DIR, `${glass.id}-on.webp`),
  );

  // The swatch shows the glass lit evenly, at the level of the middle of the pane.
  const chip = await textureOf(src, glass.swatch, SWATCH, SWATCH);
  await render(
    SWATCH, SWATCH, litRamp,
    (u, v, i) => 0.4 + glass.texture.lit * chip.detail[i],
    path.join(OUT_DIR, `${glass.id}-swatch.webp`),
  );

  generated[glass.id] = {
    /** The lit glass at the middle of the pane. */
    lit: linearToHex(litRamp(0.4)),
    /** The light it throws on the wall and the mirror beside it. */
    glow: linearToHex(litRamp(0.62)),
    /** The unlit glass. */
    unlit: linearToHex(offRamp(0.3)),
  };
  console.log(glass.id.padEnd(10), generated[glass.id]);
}

await writeFile(OUT_JSON, JSON.stringify(generated, null, 2) + "\n");
console.log("wrote", path.relative(root, OUT_DIR), "and", path.relative(root, OUT_JSON));
