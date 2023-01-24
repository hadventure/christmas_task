// import { THomeLauyout } from '@/types/types';
// import HomeLayout from '@/views/home-layout/home-layout';
// import Main from '@/views/toys-layout/toys-layout';
// import TreeLayout from '@/views/tree-layout/tree-layout';

// export type TRouter = {
//   '': typeof HomeLayout;
//   '#/tree': typeof TreeLayout;
//   '#/toys': typeof Main;
//   [index: string]: THomeLauyout
// };

class Router {
  static root: HTMLElement;

  static controller: any;

  constructor(root: HTMLElement, controller: any) {
    Router.root = root;
    Router.controller = controller;

    document.addEventListener('DOMContentLoaded', () => {
      Router.initView();
    });

    window.onpopstate = function(event) {
      alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };
  }

  static initView() {
    this.root.innerHTML = '';

    const View = this.controller[window.location.hash];
    const view = new View(this.root);

    view.register();
  }
}

export default Router;
