type TScan = {
  id: string;
  createdAt: string;
  status: string;
  url: string;
};

type TScans = {
  count: number;
  data: Array<TScan>;
};

export type { TScans };
