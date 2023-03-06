import { ImagesStore } from '@/models/images-store';
import EventEmitter from './event-emitter';

class Router {
  static root: HTMLElement;

  static controller: any;

  constructor(root: HTMLElement, controller: any) {
    Router.root = root;
    Router.controller = controller;

    document.addEventListener('DOMContentLoaded', async () => {
      console.log('DOMContentLoaded');
      const imagesStore = new ImagesStore();
      await imagesStore.loadImages();

      Router.initView();
    });

    window.onpopstate = function (event) {
      alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
    };
  }

  static async initView() {
    this.root.innerHTML = '';

    if (!window.location.hash.includes('tree')) {
      EventEmitter.emit('remove');
    }

    const View = this.controller[window.location.hash];

    console.log(View);
    const view = new View(this.root);

    view.register();
  }
}

export default Router;
