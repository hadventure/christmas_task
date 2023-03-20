import Modal from './components/modal/modal';

class App {
  private _root = <HTMLElement>document.querySelector('#root');

  initialize() {
    Modal.register(this._root);
  }

  get root() {
    return this._root;
  }
}

export default App;
