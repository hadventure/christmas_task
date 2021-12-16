import Controller from '@/common/controller';
import { mainpage } from '@/common/pages';

class App {
  static root = <HTMLElement>document.querySelector('#root');

  static activePage = mainpage;

  set activePage(val: string) {
    this.activePage = val;
  }

  static initialize() {
    this.register();
  }

  static register() {
    Controller.setPage(this.activePage, this.root);
  }
}

export default App;
