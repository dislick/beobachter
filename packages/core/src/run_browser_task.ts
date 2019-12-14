import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';
import { waitForSeconds } from './utils/wait';
import { BrowserTask, BaseAdapter } from '@beobachter/adapter';

export async function runBrowserTasks(
  tasks: BrowserTask[],
  adapters: BaseAdapter[]
) {
  const browser = await puppeteer.launch();

  tasks.forEach(async task => {
    while (true) {
      try {
        const value = await scrapeWebsite(browser, task.url, task.fn);
        for (const adapter of adapters) {
          adapter.record(task, value);
        }
      } catch (error) {
        console.error('Error while running browser task', error);
      }

      await waitForSeconds(task.interval);
    }
  });
}
