import Router from './common/router';
import Modal from './components/modal/modal';
import controller from './common/controller';

class App {
  static root = <HTMLElement>document.querySelector('#root');

  static initialize() {
    this.register();
    Modal.register(this.root);
  }

  static register() {
    const router = new Router(this.root, controller);
    // router.register();
  }
}

export default App;
