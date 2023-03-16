import App from '@/app';
import LS from './common/local-storage';
import './app.scss';
import Player from './models/player';
import Router from './common/router';

LS.initLocalStorage();

const app = new App();
app.initialize();

const router = new Router(app.root);
router.listen();

Player.initialize();
