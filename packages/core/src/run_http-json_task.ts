import { Task } from '@wetcher/adapter';
import request from 'request-promise-native';
import { get } from 'lodash';
import { waitForSeconds } from './utils/wait';
import { adapters } from './main';

export async function runHttpJsonTasks(tasks: Task[]) {
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
        console.error('Error while running http-json task', error.message);
      }

      await waitForSeconds(task.interval);
    }
  });
}
