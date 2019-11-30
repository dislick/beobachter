import { join } from 'path';
import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';

const config = require(join(__dirname, '../config.json'));

async function bootstrap() {
  const browser = await puppeteer.launch();

  for (const task of config.tasks) {
    setInterval(async () => {
      const value = await scrapeWebsite(browser, task.url, task.fn);
      console.log(`[${task.name}] ${value}`);
    }, task.interval * 1000);
  }
}

bootstrap();
