import controller from '@/common/controller';
import { mainpage } from '@/common/pages';
import Router from './common/router';
import Modal from './components/modal/modal';

class App {
  static root = <HTMLElement>document.querySelector('#root');

  static activePage = mainpage;

  set activePage(val: string) {
    this.activePage = val;
  }

  static initialize() {
    this.register();
    Modal.register(this.root);
  }

  static register() {
    const router = new Router(this.root);
    router.register();
  }
}

export default App;
