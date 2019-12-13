import { join } from 'path';
import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';
import { AdapterConsole } from '@wetcher/adapter-console';
import { Adapter, Task } from '@wetcher/adapter';
import request from 'request-promise-native';
import { get } from 'lodash';

const config: {
  adapters: any;
  tasks: Task[];
} = require(join(__dirname, '../config.json'));

const adapters: Adapter[] = config.adapters.map((entry: any) => {
  return new AdapterConsole(entry.options);
});

async function bootstrap() {
  const browserTasks = config.tasks.filter(task => task.type === 'browser');
  const httpJsonTasks = config.tasks.filter(task => task.type === 'http-json');

  runBrowserTasks(browserTasks);
  runHttpJsonTasks(httpJsonTasks);
}

async function runBrowserTasks(tasks: Task[]) {
  const browser = await puppeteer.launch();

  for (const task of tasks) {
    setInterval(async () => {
      if (!task.fn) {
        throw new Error('You must provide property "fn" for a browser task');
      }

      const value = await scrapeWebsite(browser, task.url, task.fn);

      for (const adapter of adapters) {
        adapter.record(task, value);
      }
    }, task.interval * 1000);
  }
}

async function runHttpJsonTasks(tasks: Task[]) {
  for (const task of tasks) {
    setInterval(async () => {
      if (!task.path) {
        throw new Error(
          'You must provide property "path" for a http-json task'
        );
      }

      const response = await request.get(task.url, {
        headers: {
          'User-Agent': 'wetcher',
        },
        json: true,
      });
      const value = get(response, task.path);

      for (const adapter of adapters) {
        adapter.record(task, value);
      }
    }, task.interval * 1000);
  }
}

bootstrap();
