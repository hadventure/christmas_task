import HomeLayout from '@/views/home-layout/home-layout';
import Main from '@/views/main-layout/main';
import TreeLayout from '@/views/tree-layout/tree-layout';
import controller from './controller';

type TRouter = {
  '': typeof HomeLayout;
  '#/tree': typeof TreeLayout;
  '#/toys': typeof Main;
  [index: string]: typeof Main | typeof TreeLayout | typeof HomeLayout
};

class Router {
  root: HTMLElement;

  controller: TRouter;

  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = controller;

    document.addEventListener('DOMContentLoaded', () => {
      this.initView();
    });
  }

  register() {
    window.addEventListener('popstate', () => {
      this.root.innerHTML = '';
      this.initView();
    });
  }

  initView() {
    const View = this.controller[window.location.hash];
    const view = new View(this.root);

    view.register();
  }
}

export default Router;
