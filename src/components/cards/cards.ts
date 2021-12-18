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

    Toy.filter.filter.favourite = LS.ls.fav;
  }

  static renderCrads() {
    Cards.toyList.innerHTML = '';

    Toy.filterd.forEach((element) => {
      const toy = new Card(Cards.toyList, element);
      toy.register();
    });
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

    Cards.renderHead();
    this.root.append(Cards.headRoot);
    this.root.append(Cards.toyList);

    Cards.renderCrads();
  }
}

export default Cards;
