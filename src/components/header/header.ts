import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './header.module.scss';

class Header extends Component {
  private favWrap = Tag.create(Tags.div, cls.favWrap);

  private heart = Tag.create(Tags.div, cls.heart);

  constructor(root: HTMLElement) {
    super(root);
    Toy.filter.filter.favourite = LS.ls.fav;

    EventEmitter.subscribe('change:favourite', () => {
      this.renderFav();
    });

    EventEmitter.subscribe('reset:storage', () => {
      this.renderFav();
    });
  }

  renderFav() {
    this.favWrap.textContent = `${Toy.filter.filter.favourite.length}`;
    this.favWrap.append(this.heart);
  }

  register() {
    const settings = Tag.create(Tags.div, cls.tempWrap);

    const header = Tag.create(Tags.div, `${cls.header} content`);
    this.root.append(header);

    this.renderFav();

    const navWrap = Tag.create(Tags.div, cls.navWrap);
    const nav1 = Tag.create(Tags.div, cls.nav1);

    nav1.append(navWrap, this.favWrap);
    header.append(settings, nav1);

    const nav = [
      { name: 'Главная', path: '#' },
      { name: 'Игрушки', path: '#/toys' },
      { name: 'Ёлка', path: '#/tree' },
    ];

    nav.forEach((el) => {
      const chunk = Tag.create(Tags.btn, cls.navItem);
      chunk.textContent = el.name;
      chunk.dataset.path = el.path;

      if (window.location.hash.includes(el.path) && el.path !== '#') {
        chunk.classList.add(cls.active);
      }

      navWrap.append(chunk);
    });

    navWrap.onclick = (e) => {
      const el = <HTMLElement>e.target;

      if (el.classList.contains(cls.navItem)) {
        window.history.pushState({ path: el.dataset.path }, '', el.dataset.path);
      }
    };
  }
}

export default Header;
