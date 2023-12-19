const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // 크롤링할 사이트의 URL을 입력합니다.
  const url = "http://localhost:3000/";
  await page.goto(url);

  // 동적으로 로딩되는 내용이 있다면, 적절한 대기 시간을 설정합니다.
  await page.waitForTimeout(2000); // 2초 대기 (필요에 따라 조절)

  // 페이지 내에서 데이터를 추출하거나 조작하는 로직을 작성합니다.
  const title = await page.title();
  console.log("페이지 제목:", title);

  // 예제로 페이지의 내용을 출력합니다.
  const content = await page.content();
  //   console.log("페이지 내용:", content);
  //   fs.writeFileSync("page_content.txt", content);
  const $ = cheerio.load(content);
  console.log($.html());

  // 브라우저를 닫습니다.
  await browser.close();
}

run();
