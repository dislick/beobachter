import { Adapter, Task } from '@wetcher/adapter';
import 'colors';

interface Options {
  colors: boolean;
}

export class AdapterConsole extends Adapter<Options> {
  async record(task: Task, value: any) {
    if (this.options.colors) {
      console.log(`[${task.name}]`.cyan, `[${task.interval}s]`.grey, value);
    } else {
      console.log(`[${task.name}]`, `[${task.interval}s]`, value);
    }
  }
}
