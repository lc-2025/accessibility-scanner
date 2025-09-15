type TApiResponse = TScans | TScan | TMessage | TResult;

type TMessage = {
  message: string;
};

type TResult = {
  result: string;
};

type TScan = {
  id: string;
  createdAt: string;
  status: string;
  url: string;
  violations?: Array<TScanViolation>;
};

type TScanViolation = {
  description: string;
  impact: string;
  nodes: Array<TScanViolationNode>;
};

type TScanViolationNode = Pick<TScanViolation, 'impact'> & {
  any: Array<TScanViolationNodeDetails>;
  all: Array<TScanViolationNodeDetails>;
  failureSummary: string;
  html: string;
  none: Array<TScanViolationNodeDetails>;
  target: Array<string>;
};

type TScanViolationNodeDetails = Pick<TScanViolation, 'impact'> & {
  id: string;
  data: Record<any, any>;
  message: string;
  relatedNodes: Array<TScanViolationNode>;
};

type TScans = {
  count: number;
  data: Array<TScan>;
};

export type { TApiResponse, TScan, TScans, TScanViolation, TScanViolationNode };
