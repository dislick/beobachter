import puppeteer from 'puppeteer';

export async function scrapeWebsite<T>(
  browser: puppeteer.Browser,
  url: string,
  fn: string
): Promise<T> {
  const page = await browser.newPage();
  await page.goto(url);
  // @ts-ignore
  const value = await page.evaluate(Function(fn));
  return value;
}
