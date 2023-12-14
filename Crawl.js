const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  // 크롤링할 사이트의 URL을 입력합니다.
  const url = "https://newbsm.team-insert.com/";
  await page.goto(url);

  // 동적으로 로딩되는 내용이 있다면, 적절한 대기 시간을 설정합니다.
  await page.waitForSelector("div.HomeMeal__MealBody-sc-14tuhgb-1.dVNnfX");

  // 페이지 내에서 데이터를 추출하거나 조작하는 로직을 작성합니다.
  const content = await page.content();

  // Cheerio를 사용하여 페이지의 HTML을 분석합니다.
  const $ = cheerio.load(content);

  // Cheerio를 사용하여 원하는 데이터를 추출합니다.
  const children = [];
  $(
    "body > div.LayoutProvider__Layout-sc-1x59ngz-1.kYtpnA > main > div > div.Column__StyledColumn-sc-5y0q8e-0.hlkkZD > div:nth-child(1) > div.HomeMeal__Container-sc-14tuhgb-0.iTOKRC > div.HomeMeal__MealBody-sc-14tuhgb-1.dVNnfX > p",
  )
    .children()
    .each((index, element) => {
      children.push($(element).text());
    });

  // 추출된 데이터를 출력합니다.
  console.log("추출된 자식 요소:", children);

  // 브라우저를 닫습니다.
  await browser.close();
}

run();
