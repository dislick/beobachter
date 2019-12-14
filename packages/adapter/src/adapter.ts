import { Task } from './task.interface';

export abstract class BaseAdapter<T = {}> {
  constructor(protected options?: T) {}
  async record(task: Task, value: any): Promise<void> {}
}
