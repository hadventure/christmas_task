import HomeLayout from '@/views/home-layout/home-layout';

export type TFilterNest = {
  [index: string]: boolean
};

export type TFilterRange = {
  percent: string[],
  years: string[],
};

export type TFavourite = {
  num: string,
  count: string,
};

export type TFilter = {
  favourite: TFavourite[],
  isFavourite: boolean,
  search: string,
  colors: TFilterNest,
  shapes: TFilterNest,
  sizes: TFilterNest,
  yearRange: TFilterRange,
  qtyRange: TFilterRange,
};

export type TSorter = {
  name: string,
  direction: string
};

export type THomeLauyout = typeof HomeLayout;

export type TTreeFilter = {
  tree: string,
  bg: string,
  garland: string,
  player: boolean,
  snow: boolean,
};
