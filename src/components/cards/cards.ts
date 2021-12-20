import Component from '@/common/component';
import Tag from '@/common/tag';
import EventEmitter from '@/common/event-emitter';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import Card from '../card/card';
import cls from './cards.module.scss';
import LS from '@/common/local-storage';

class Cards extends Component {
  static toyList = Tag.create(Tags.div, `${cls.toyList}`);

  static headRoot = Tag.create(Tags.div);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:filter', () => {
      Toy.filterList();
      Cards.renderCrads();
    });

    EventEmitter.subscribe('change:favourite', () => {
      Cards.renderHead();
    });

    EventEmitter.subscribe('change:sorter', () => {
      Toy.sortList();
      Cards.renderCrads();
    });

    EventEmitter.subscribe('reset:filter', () => {
      Toy.filterList();
      Cards.renderCrads();
    });

    Toy.filter.filter.favourite = LS.ls.fav;
    // TODO !!!
    Toy.filter.filter = LS.ls.filter;
    Toy.filter.filter.favourite = LS.ls.fav;
    Toy.filter.sorter = LS.ls.sorter;
  }

  static renderCrads() {
    Cards.toyList.innerHTML = '';

    if (Toy.filterd.length === 0) {
      Cards.toyList.innerHTML = 'Извините, совпадений не обнаружено';
    } else {
      Toy.filterd.forEach((element) => {
        const toy = new Card(Cards.toyList, element);
        toy.register();
      });
    }
  }

  static renderHead() {
    const head = `
      <div class=${cls.toysHead}>игрушки (${Toy.filter.filter.favourite.length})</div>
    `;

    const headTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    headTpl.innerHTML = head;

    Cards.headRoot.innerHTML = '';
    Cards.headRoot.append(headTpl.content);
  }

  async register() {
    await Toy.getList();

    const btn = Tag.create(Tags.btn, cls.reset);
    btn.textContent = 'Очистить фильтры';
    btn.addEventListener('click', () => {
      Toy.resetFilter();
    });

    Cards.renderHead();
    this.root.append(Cards.headRoot, Cards.toyList);

    Cards.renderCrads();
    Cards.toyList.before(btn);
  }
}

export default Cards;
