https://github.com/westmonroe/pdf-puppeteer/blob/master/src/convertHTMLToPDF.js

1. 선언 html, callback, (slides옵션, 퍼페티어 옵션)

slidesToPDF()

animation delay

mode : 'slow' | "fast"

slow모드는 브라우저 한단계씩 스샷 1. url로 스냅샷 확인

fast모드는 엘리먼트 사전 수집 후, thread polling으로 한번에
document.querySelector('.stack')으로 슬라이드 적용
