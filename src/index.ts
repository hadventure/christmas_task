import App from '@/app';
import LS from './common/local-storage';
import './app.scss';

LS.initLocalStorage();
App.initialize();
