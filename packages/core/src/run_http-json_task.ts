import { HttpJsonTask } from '@beobachter/adapter';
import { get } from 'lodash';
import request from 'request-promise-native';
import { adapters } from './main';
import { waitForSeconds } from './utils/wait';

export async function runHttpJsonTasks(tasks: HttpJsonTask[]) {
  tasks.forEach(async task => {
    while (true) {
      try {
        const response = await request.get(task.url, {
          headers: {
            'User-Agent': 'beobachter',
          },
          json: true,
        });
        const value = get(response, task.path);
        for (const adapter of adapters) {
          adapter.record(task, value);
        }
      } catch (error) {
        console.error('Error while running http-json task', error.message);
      }

      await waitForSeconds(task.interval);
    }
  });
}
