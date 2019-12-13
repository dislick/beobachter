import { join } from 'path';
import puppeteer from 'puppeteer';
import { scrapeWebsite } from './scrape_website';
import { AdapterConsole } from '@wetcher/adapter-console';
import { Adapter, Task } from '@wetcher/adapter';
import request from 'request-promise-native';
import { get } from 'lodash';
import { waitForSeconds } from './utils/wait';

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
        console.log('error', error);
      }

      await waitForSeconds(task.interval);
    }
  });
}

async function runHttpJsonTasks(tasks: Task[]) {
  tasks.forEach(async task => {
    while (true) {
      if (!task.path) {
        throw new Error(
          'You must provide property "path" for a http-json task'
        );
      }

      try {
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
      } catch (error) {
        console.log('Error in http-json task', error.message);
      }

      await waitForSeconds(task.interval);
    }
  });
}

bootstrap();
