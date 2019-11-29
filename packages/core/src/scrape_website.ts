import puppeteer from 'puppeteer';

export async function scrapeWebsite<T>(
  browser: puppeteer.Browser,
  url: string,
  fnString: string
): Promise<T> {
  const page = await browser.newPage();

  await page.goto(url);

  const fn = Function(fnString) as () => T;
  const value = await page.evaluate(fn);

  return value;
}
