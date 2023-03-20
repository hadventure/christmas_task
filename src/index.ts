import App from '@/app';
import LS from './common/local-storage';
import './app.scss';
import Player from './models/player';
import Router from './common/router';
import Tree from './models/tree';

try {
  LS.initLocalStorage();
  Tree.setInitialTreeFilter();

  const app = new App();
  app.initialize();

  const router = new Router(app.root);
  router.listen();

  Player.initialize();
} catch (error) {
  console.log(error);
}
