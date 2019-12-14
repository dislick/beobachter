import {
  Adapter,
  isBrowserTask,
  isHttpJsonTask,
  Task,
} from '@beobachter/adapter';
import { join } from 'path';
import { createAdaptersFromConfig } from './create_adapters_from_config';
import { runBrowserTasks } from './run_browser_task';
import { runHttpJsonTasks } from './run_http-json_task';

const config: {
  adapters: Adapter[];
  tasks: Task[];
} = require(join(__dirname, '../config.json'));

async function bootstrap() {
  const adapters = createAdaptersFromConfig(config.adapters);

  const browserTasks = config.tasks.filter(isBrowserTask);
  const httpJsonTasks = config.tasks.filter(isHttpJsonTask);

  runBrowserTasks(browserTasks, adapters);
  runHttpJsonTasks(httpJsonTasks, adapters);
}

bootstrap();
