import { AdapterConsole } from '@beobachter/adapter-console';
import { Adapter } from '@beobachter/adapter';

export function createAdaptersFromConfig(adapters: Adapter[]) {
  return adapters.map(entry => {
    switch (entry.name) {
      case 'adapter-console':
        return new AdapterConsole(entry.options);
      default:
        throw new Error(`Unknown adapter type ${entry.name}`);
    }
  });
}
