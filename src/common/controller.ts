import Main from '../components/main-layout/main';
// import { mainpage } from './pages';

class Controller {
  static setPage(page: string, root: HTMLElement) {
    const rootPage = root;
    rootPage.innerHTML = '';

    const currentPage = new Main(rootPage);
    currentPage.register();
  }
}

export default Controller;
