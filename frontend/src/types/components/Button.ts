type TButton = {
  ariaLabel?: string;
  callback?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  label: string;
  link?: string;
  title?: string;
  type?: string;
  variant: string;
};

export type { TButton };
