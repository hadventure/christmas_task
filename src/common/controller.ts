import TreeLayout from '@/views/tree-layout/tree-layout';
import Main from '../views/main-layout/main';
// import { mainpage } from './pages';

class Controller {
  static setPage(page: string, root: HTMLElement) {
    const rootPage = root;
    rootPage.innerHTML = '';

    // const currentPage = new Main(rootPage);

    const currentPage = new TreeLayout(rootPage);
    currentPage.register();
  }
}

export default Controller;
