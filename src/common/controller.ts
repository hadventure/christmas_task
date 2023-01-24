import HomeLayout from '@/views/home-layout/home-layout';
import Main from '@/views/toys-layout/toys-layout';
import TreeLayout from '@/views/tree-layout/tree-layout';

const controller = {
  '': HomeLayout,
  '#/tree': TreeLayout,
  '#/toys': Main,
};

export default controller;
