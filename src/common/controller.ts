import Main from '../components/main-layout/main';
import {
  mainpage,
} from './pages';

interface IController {
  // setPage: (page: string, root: HTMLElement) => void
}

class Controller implements IController {
  static setPage(page: string, root: Element) {
    const rootPage = root;
    rootPage.innerHTML = '';

    const pages = {
      [mainpage]: Main
    };

    const currentPage = new Main(rootPage);
    currentPage.register();
  }
}

export default Controller;
