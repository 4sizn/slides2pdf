const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const easyimg = require("easyimage");
const MAIN_SELECTOR = ".reveal-frame";
const DECK_CUDOS_SELECTOR = ".deck-kudos";
const CONTROLS_SELECTOR = "aside.controls";

const viewPort = { width: 1280, height: 800 };

const html =
  "https://infinite-red.slides.com/gantlaborde/adventures-in-ai-javascript#/";

(async () => {
  //set local directory before launch
  init();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport(viewPort);
  await page.goto(html);

  //set options
  const [width, height] = await settings(page);
  let current = html;
  let n = 0;

  do {
    do {
      await page.screenshot({
        path: `output/example${++n}.png`,
        clip: {
          x: 0,
          y: 0,
          width,
          height,
        },
      });
      current = page.url();
      await page.keyboard.press("ArrowDown");
      await page.waitFor(1000);
    } while (current !== page.url());
    current = page.url();
    await page.keyboard.press("ArrowRight");
    await page.waitFor(1000);
  } while (current !== page.url());
  await browser.close();

  await easyimg.convert({
    src: "output" + "/*." + "png",
    dst: "result" + ".pdf",
  });
})();

async function init() {
  await fs.remove("output");
  await fs.promises.mkdir("output");
}

async function settings(page) {
  return await page.evaluate(
    ([a, b, c]) => {
      const controlEl = document.querySelector(b);
      controlEl.parentNode.removeChild(controlEl);
      const deckEl = document.querySelector(c);
      deckEl.parentNode.removeChild(deckEl);
      const mainEl = document.querySelector(a);

      return [mainEl.clientWidth, mainEl.clientHeight];
    },
    [MAIN_SELECTOR, DECK_CUDOS_SELECTOR, CONTROLS_SELECTOR]
  );
}
