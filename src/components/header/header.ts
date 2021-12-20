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
    const header = Tag.create(Tags.div, cls.header);
    this.root.append(header);

    this.renderFav();

    const navWrap = Tag.create(Tags.div, cls.navWrap);
    header.append(navWrap, this.favWrap);

    const nav = [
      { name: 'Елка', path: '' },
      { name: 'Игрушки', path: '', active: true },
      { name: 'Главная', path: '' },
    ];

    nav.forEach((el) => {
      const chunk = Tag.create(Tags.btn, cls.navItem);
      chunk.textContent = el.name;

      if (el.active) {
        chunk.classList.add(cls.active);
      }

      navWrap.append(chunk);
    });
  }
}

export default Header;
