export interface Task {
  type: 'browser' | 'http-json' | 'http-text';
  name: string;
  description: string;
  url: string;
  interval: number;

  fn?: string; // browser
  path?: string; // http-json
  regex?: string; // http-text
}
