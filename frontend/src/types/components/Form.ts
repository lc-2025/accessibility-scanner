type TFormField = {
  callback: (action: string, index?: number) => void;
  index: number;
  urls: number;
};

type TFormFieldset = {
  urls: Array<TFormFieldsetField>;
};

type TFormFieldsetField = {
  url: string;
};

export type { TFormField, TFormFieldset };
