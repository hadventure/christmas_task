import Component from '@/common/component';
import El from '@/common/tag';
import EventEmitter from '@/common/event-emitter';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import Card from '../card/card';
import cls from './cards.module.scss';

class Cards extends Component {
  static toyList = El.create(Tags.div, `${cls.toyList}`)

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:color', () => {
      Toy.filterColor();
      this.render();
    });
  }

  render() {
    Cards.toyList.innerHTML = '';

    console.log(Toy.filterd)

    Toy.filterd.forEach(element => {
      const toy = new Card(Cards.toyList, element)
      toy.register();
    });
  }

  async register() {
    await Toy.getList();

    const head = `
      <div class=${cls.toysHead}>игрушки</div>
    `;

    const headTpl = document.createElement(Tags.tpl);
    headTpl.innerHTML = head;
    this.root.append(headTpl.content);
    this.root.append(Cards.toyList);

    this.render();

  }
}

export default Cards;
