import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';
import { Task } from '@wetcher/adapter';
import { waitForSeconds } from './utils/wait';
import { adapters } from './main';

export async function runBrowserTasks(tasks: Task[]) {
  const browser = await puppeteer.launch();

  tasks.forEach(async task => {
    while (true) {
      if (!task.fn) {
        throw new Error('You must provide property "fn" for a browser task');
      }

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
