import { join } from 'path';
import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';
import { AdapterConsole } from '@wetcher/adapter-console';
import { Adapter, Task } from '@wetcher/adapter';

const config: {
  adapters: any;
  tasks: Task[];
} = require(join(__dirname, '../config.json'));

const adapters: Adapter[] = config.adapters.map((entry: any) => {
  return new AdapterConsole(entry.options);
});

async function bootstrap() {
  const browser = await puppeteer.launch();

  for (const task of config.tasks) {
    setInterval(async () => {
      const value = await scrapeWebsite(browser, task.url, task.fn);

      for (const adapter of adapters) {
        adapter.record(task, value);
      }
    }, task.interval * 1000);
  }
}

bootstrap();
