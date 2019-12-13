import {
  Task,
  BrowserTask,
  HttpJsonTask,
  HttpTextTask,
} from './task.interface';

export function isBrowserTask(task: Task): task is BrowserTask {
  return task.type === 'browser' && task.fn !== void 0;
}

export function isHttpJsonTask(task: Task): task is HttpJsonTask {
  return task.type === 'http-json' && task.path !== void 0;
}

export function isHttpTextTask(task: Task): task is HttpTextTask {
  return task.type === 'http-text' && task.regex !== void 0;
}
