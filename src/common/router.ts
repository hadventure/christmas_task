import ImagesStore from '@/models/images-store';
import { EventEmitter } from './event-emitter';
import HomeLayout from '@/views/home-layout/home-layout';
import Main from '@/views/toys-layout/toys-layout';
import TreeLayout from '@/views/tree-layout/tree-layout';
import { Progress } from '@/components/progress/progress';

class Router {
  static root: HTMLElement;

  static controller: { [index: string]: typeof HomeLayout | typeof TreeLayout | typeof Main };

  constructor(root: HTMLElement) {
    Router.root = root;

    Router.controller = {
      '': HomeLayout,
      '#/tree': TreeLayout,
      '#/toys': Main,
    };
  }

  listen() {
    document.addEventListener('DOMContentLoaded', async () => {
      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, args) => {
          const proxiedFunction = Reflect.apply(target, thisArg, args);
          Router.initView();
          return proxiedFunction;
        },
      });

      const progress = new Progress(Router.root);
      progress.register();

      await ImagesStore.loadImages();
      progress.destroy();
      Router.initView();
    });
  }

  static initView() {
    this.root.innerHTML = '';

    if (!window.location.hash.includes('tree')) {
      EventEmitter.emit('remove');
    }

    const View = Router.controller[window.location.hash];
    const layout = new View(this.root);

    layout.register();
  }
}

export default Router;
