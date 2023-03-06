import { ImagesStore } from '@/models/images-store';
import controller, { Controller } from './controller';
import EventEmitter from './event-emitter';

class Router {
  static root: HTMLElement;

  static controller: Controller;

  constructor(root: HTMLElement) {
    Router.root = root;
    Router.controller = controller;
  }

  listen() {
    document.addEventListener('DOMContentLoaded', async () => {
      const imagesStore = new ImagesStore();
      await imagesStore.loadImages();

      Router.initView();
    });
  }

  static async initView() {
    this.root.innerHTML = '';

    if (!window.location.hash.includes('tree')) {
      EventEmitter.emit('remove');
    }

    const View = this.controller[window.location.hash];
    const view = new View(this.root);

    view.register();
  }
}

export default Router;
