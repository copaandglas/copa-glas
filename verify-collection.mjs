import puppeteer from "puppeteer";
import { mkdirSync } from "fs";

const OUT = "verify-shots";
mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const [name, w, h] of [["ipad-portrait", 768, 1024], ["ipad-pro11", 834, 1194]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3001/collection", { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1200));
  // crop the first card image area (top of grid)
  const img = await page.$("a[aria-label^='Browse'] div");
  if (img) {
    const box = await img.boundingBox();
    await page.screenshot({ path: `${OUT}/collection-${name}-crop.png`, clip: { x: box.x, y: box.y, width: Math.min(box.width, w), height: Math.min(box.height, 600) } });
  }
  await page.screenshot({ path: `${OUT}/collection-${name}.png` });
  await page.close();
}
await browser.close();
console.log("done");
