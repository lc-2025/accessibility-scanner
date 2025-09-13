type TButton = {
  callback: (e: React.MouseEvent<HTMLElement>) => void;
  label: string;
  link?: string;
  title?: string;
  type: string;
};

export type { TButton };
