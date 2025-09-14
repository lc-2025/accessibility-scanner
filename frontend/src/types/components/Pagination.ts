type TPagination = {
  callback: (page: number, jump?: boolean) => void;
  pages: number;
};

export type { TPagination };
