const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const PDFDocument = require("pdfkit");
const MAIN_SELECTOR = ".reveal-frame";
const DECK_CUDOS_SELECTOR = ".deck-kudos";
const CONTROLS_SELECTOR = "aside.controls";

const viewPort = { width: 800, height: 600 };
const html = "https://slides.com/news/slide-settings/";

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

  //   generate pdf
  const doc = new PDFDocument({ autoFirstPage: false, layout: "landscape" });
  doc.pipe(fs.createWriteStream("./output/example.pdf"));

  for (let i = 1; i <= n; i++) {
    doc.addPage({ size: [width, height] });
    doc.image(`./output/example${i}.png`, 0, 0);
  }

  doc.flushPages();
  doc.end();
})();

async function init() {
  await fs.remove("output");
  await fs.promises.mkdir("output");
}

async function settings(page) {
  return await page.evaluate(
    ([a, b, c]) => {
      const controlEl = document.querySelector(b);
      controlEl && controlEl.parentNode.removeChild(controlEl);
      const deckEl = document.querySelector(c);
      deckEl && deckEl.parentNode.removeChild(deckEl);
      const mainEl = document.querySelector(a);

      return [mainEl.clientWidth, mainEl.clientHeight];
    },
    [MAIN_SELECTOR, DECK_CUDOS_SELECTOR, CONTROLS_SELECTOR]
  );
}
