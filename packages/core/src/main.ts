import { join } from 'path';
import { AdapterConsole } from '@beobachter/adapter-console';
import {
  Adapter,
  Task,
  isBrowserTask,
  isHttpJsonTask,
} from '@beobachter/adapter';
import { runBrowserTasks } from './run_browser_task';
import { runHttpJsonTasks } from './run_http-json_task';

const config: {
  adapters: any;
  tasks: Task[];
} = require(join(__dirname, '../config.json'));

// TODO: Properly set up adapters
export const adapters: Adapter[] = config.adapters.map((entry: any) => {
  return new AdapterConsole(entry.options);
});

async function bootstrap() {
  const browserTasks = config.tasks.filter(isBrowserTask);
  const httpJsonTasks = config.tasks.filter(isHttpJsonTask);

  runBrowserTasks(browserTasks);
  runHttpJsonTasks(httpJsonTasks);
}

bootstrap();
