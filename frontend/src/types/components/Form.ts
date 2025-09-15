type TFormField = {
  callback: (action: string) => void;
  index: number;
  urls: number;
};

type TFormFieldset = {
  url: string;
}

export type { TFormField, TFormFieldset };
