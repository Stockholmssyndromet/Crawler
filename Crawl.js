const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

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

  // Cheerio를 사용하여 페이지의 HTML을 분석합니다.
  const $ = cheerio.load(content);

  const searchText = "취소/반품/교환"; // 여기에 원하는 텍스트를 입력합니다.
  const selectedElement = $(`:contains("${searchText}"):last`); // 해당 텍스트를 포함하는 엘리먼트를 선택합니다.
  //   console.log(selectedElement.html());
  console.log(selectedElement.parent().text());
  //   const parents = selectedElement.parents(selectedValue).html();

  // 브라우저를 닫습니다.
  await browser.close();
}
run();

app.listen(3000);
