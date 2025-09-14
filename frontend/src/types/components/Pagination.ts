type TPagination = {
  callback: (action: string, page?: number) => void;
  page: number;
  pages: number;
};

export type { TPagination };
