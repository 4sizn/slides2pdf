const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const FULLSCREEN_SELECTOR = `a.fullscreen-button`;
const html =
  "https://infinite-red.slides.com/gantlaborde/adventures-in-ai-javascript#/4";

(async () => {
  init();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(html);
  await page.evaluate((sel) => {
    document.querySelector(sel).click();
  }, FULLSCREEN_SELECTOR);
  // await page.click(FULLSCREEN_SELECTOR);
  // await page.waitFor(3000);

  let current = html;
  let n = 0;
  do {
    await page.screenshot({ path: `output/example${++n}.png` });
    current = page.url();
    await page.keyboard.press("ArrowDown");
  } while (current !== page.url());

  // await page.pdf({ path: "hn.pdf", format: "A4" });
  await browser.close();
})();

async function init() {
  await fs.remove("output");
  await fs.promises.mkdir("output");
}
