export type TFilterNest = {
  [index: string]: boolean
};

export type TFilterRange = {
  percent: string[],
  years: string[],
};

export type TFilter = {
  favourite: string[],
  isFavourite: boolean,
  search: string,
  colors: TFilterNest,
  shapes: TFilterNest,
  sizes: TFilterNest,
  yearRange: TFilterRange,
  qtyRange: TFilterRange,
  // [x: string]: string | TFilterRange | TFilterRange | TFilterNest | boolean | string[]
};

export type TSorter = {
  name: string,
  direction: string
};
