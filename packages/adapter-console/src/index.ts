import { Adapter, Task } from '@beobachter/adapter';
import 'colors';
import { formatISO } from 'date-fns';

interface Options {
  colors: boolean;
}

export class AdapterConsole extends Adapter<Options> {
  async record(task: Task, value: any) {
    const dateString = formatISO(new Date());

    if (this.options.colors) {
      console.log(
        this.tag(dateString).grey,
        this.tag(task.name).cyan,
        this.tag(task.interval + 's').grey,
        value
      );
    } else {
      console.log(
        this.tag(dateString).reset,
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
