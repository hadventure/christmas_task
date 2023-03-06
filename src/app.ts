import Router from './common/router';
import Modal from './components/modal/modal';
import controller from './common/controller';

class App {
  static root = <HTMLElement>document.querySelector('#root');

  private _loading = true;

  async initialize() {
    this.register();
    Modal.register(App.root);
  }

  register() {
    new Router(App.root, controller);
  }

  public set loading(v: boolean) {
    this._loading = v;
  }
}

export default App;
