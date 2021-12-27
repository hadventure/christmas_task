import HomeLayout from "@/views/home-layout/home-layout";
import Main from "@/views/toys-layout/toys-layout";
import TreeLayout from "@/views/tree-layout/tree-layout";

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
  // [x: string]: string | TFilterRange | TFilterRange | TFilterNest | boolean | string[]
};

export type TSorter = {
  name: string,
  direction: string
};

export type TRouter = {
  '': typeof HomeLayout;
  '#/tree': typeof TreeLayout;
  '#/toys': typeof Main;
  [index: string]: typeof Main | typeof TreeLayout | typeof HomeLayout
};
