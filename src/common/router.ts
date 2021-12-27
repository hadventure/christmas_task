import { TRouter } from '@/types/types';

class Router {
  static root: HTMLElement;

  static controller: TRouter;

  // constructor(root: HTMLElement) {
  //   Router.root = root;
  //   Router.controller = controller;

  //   document.addEventListener('DOMContentLoaded', () => {
  //     Router.initView();
  //   });
  // }

  static register(root: HTMLElement, controller: TRouter) {
    Router.root = root;
    Router.controller = controller;

    document.addEventListener('DOMContentLoaded', () => {
      Router.initView();
    });

    window.addEventListener('popstate', () => {
      this.root.innerHTML = '';
      this.initView();
    });
  }

  static initView() {
    this.root.innerHTML = '';

    const View = this.controller[window.location.hash];
    const view = new View(this.root);

    view.register();
  }
}

export default Router;
