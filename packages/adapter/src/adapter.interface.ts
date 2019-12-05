export interface Adapter {
  record: (value: any) => Promise<void>;
}
