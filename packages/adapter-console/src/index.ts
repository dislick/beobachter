import { Adapter, Task } from '@wetcher/adapter';
import 'colors';

interface Options {
  colors: boolean;
}

export class AdapterConsole extends Adapter<Options> {
  async record(task: Task, value: any) {
    if (this.options.colors) {
      console.log(
        this.tag(task.name).cyan,
        this.tag(task.interval + 's').grey,
        value
      );
    } else {
      console.log(
        this.tag(task.name).reset,
        this.tag(task.interval + 's').reset,
        value.toString().reset
      );
    }
  }

  private tag(title: string): string {
    return '[' + title + ']';
  }
}
