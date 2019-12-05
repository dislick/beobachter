import { Adapter } from '@wetcher/adapter';

export const AdapterConsole: Adapter = {
  async record(value) {
    console.log('[adapter-console]', value);
  },
};
