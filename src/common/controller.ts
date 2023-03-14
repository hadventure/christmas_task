import HomeLayout from '@/views/home-layout/home-layout';
import Main from '@/views/toys-layout/toys-layout';
import TreeLayout from '@/views/tree-layout/tree-layout';

export interface Controller {
  [index: string]: typeof HomeLayout | typeof TreeLayout | typeof Main
}

const controller = {
  '': HomeLayout,
  '#/tree': TreeLayout,
  '#/toys': Main,
};

export default controller;
