interface BaseTask {
  type: 'browser' | 'http-json' | 'http-text';
  name: string;
  description: string;
  url: string;
  interval: number;
}

export interface BrowserTask extends BaseTask {
  fn: string;
}

export interface HttpJsonTask extends BaseTask {
  path: string;
}

export interface HttpTextTask extends BaseTask {
  regex: string;
}

export type Task = Partial<BrowserTask & HttpJsonTask & HttpTextTask> &
  Required<BaseTask>;
