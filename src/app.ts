import Controller from '@/common/controller';
import { mainpage } from '@/common/pages';
import LS from './common/local-storage';
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
    Controller.setPage(this.activePage, this.root);
  }
}

export default App;
