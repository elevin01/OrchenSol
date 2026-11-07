/* Development only: requires Playwright. Run after generate-brand-social.py.
   BROWSER_PATH may point to an installed Chrome; otherwise use Playwright Chromium.
   NODE_PATH=/tmp/orchen-brand-tools/node_modules node scripts/export-brand-social.cjs */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const directory = path.resolve(__dirname, '../assets/social');
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    const cards = fs.readdirSync(directory).filter(name => name.endsWith('.svg'));
    for (const name of cards) {
      await page.goto(pathToFileURL(path.join(directory, name)).href);
      await page.screenshot({ path: path.join(directory, name.replace(/\.svg$/, '.png')) });
    }
    console.log(`Exported ${cards.length} branded social PNGs.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
