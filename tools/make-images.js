/* Erzeugt die Bilder fürs Teilen, das App-Icon und die Screenshots für die README.
   Aufruf (Playwright muss installiert sein):  node tools/make-images.js  */
const { chromium, devices } = require("playwright");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const url = p => "file://" + path.join(ROOT, p);
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();

  // 1) Teilen-Bild 1200 × 630 (Open Graph / WhatsApp / X …) – auch Banner der README
  let page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(url("tools/share.html")); await sleep(400);
  await page.screenshot({ path: path.join(ROOT, "src/img/share.png") });

  // 2) App-Icon für den Home-Bildschirm (iOS)
  page = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await page.goto(url("tools/icon.html"));
  await sleep(300);
  await page.screenshot({ path: path.join(ROOT, "src/img/apple-touch-icon.png") });

  // 3) Screenshots für die README (Handy)
  const ctx = await browser.newContext({ ...devices["iPhone 13"], deviceScaleFactor: 1 });
  page = await ctx.newPage();
  await page.goto(url("src/index.html")); await sleep(1500);
  const shot = async name => page.screenshot({ path: path.join(ROOT, `docs/${name}.png`) });
  // Platzhalter-Aufnahmen (ohne Ton), damit die Startseite spielbereit aussieht
  await page.evaluate(() => { [...ALL_G, ...ALL_D].forEach(([k]) => recURL[k] = "x"); playSeq = async () => {}; refreshCounts(); });
  await sleep(800); await shot("start");
  await page.evaluate(async () => { startGame("gd"); await new Promise(r => setTimeout(r, 600)); });
  await page.evaluate(() => { answer(cur.l); });
  await sleep(1500); await shot("richtig");
  await page.evaluate(() => { lastParty = -1; const r = rnd; rnd = () => 0.01; celebrate(3, null); rnd = r; });   // Tanz „wackeln“
  await sleep(2300); await shot("feier");
  await page.evaluate(() => { endParty(); goHome(); show("parentsOverlay"); });
  await sleep(600); await shot("eltern");
  await browser.close();
})();
