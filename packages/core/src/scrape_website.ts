import { Browser } from 'puppeteer';

export async function scrapeWebsite<T>(
  browser: Browser,
  url: string,
  fnString: string
): Promise<T> {
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const fn = Function(fnString) as () => T;
  const value = await page.evaluate(fn);

  await page.close();

  return value;
}
