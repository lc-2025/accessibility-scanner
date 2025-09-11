// Types - Scan
enum Status {
  Pending = 'pending',
  Running = 'running',
  Done = 'done',
  Error = 'error',
}

type TScan = {
  status: Status;
  // TODO:
  violations: Array<any>;
};

export default TScan;
