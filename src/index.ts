import App from '@/app';
import LS from './common/local-storage';
import './app.scss';
import Player from './models/player';

LS.initLocalStorage();
App.initialize();
Player.initialize();
