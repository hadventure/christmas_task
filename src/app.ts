import Router from './common/router';
import Modal from './components/modal/modal';
import controller from './common/controller';

class App {
  static root = <HTMLElement>document.querySelector('#root');

  private router = new Router(App.root);

  constructor() {
    this.router = new Router(App.root);
  }

  async initialize() {
    this.router.listen();
    Modal.register(App.root);
  }
}

export default App;
