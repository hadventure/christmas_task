import { App } from '@/app';
import { LS } from './common/local-storage';
import Player from './models/player';
import Router from './common/router';
import Tree from './models/tree';
import './app.scss';

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
