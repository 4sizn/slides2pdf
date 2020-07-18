const puppeteer = require("puppeteer");
const FULLSCREEN_SELECTOR = `a.fullscreen-button`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://infinite-red.slides.com/gantlaborde/adventures-in-ai-javascript#/4"
  );

  await page.click(FULLSCREEN_SELECTOR);
  // await page.waitFor(3000);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowDown");

  await page.screenshot({ path: "example.png" });

  // await page.pdf({ path: "hn.pdf", format: "A4" });
  await browser.close();
})();
