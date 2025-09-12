import { Result } from 'axe-core';

// Types - Scan
enum Status {
  Pending = 'pending',
  Running = 'running',
  Done = 'done',
  Error = 'error',
}

type TScanResults = {
  url: string;
  status: Status;
  timestamp: string;
  violations: Array<Result>;
};

type TScan = TScanResults & {
  id: string;
};

export { Status, TScan, TScanResults };
