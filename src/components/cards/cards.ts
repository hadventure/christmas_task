import El from '@/common/el';
import EventEmitter from '@/common/event-emitter';
import Helper from '@/common/helper';
import Filter from '@/models/filter';
import Toy from '@/models/toy';
import Card from '../card/card';
import cls from './cards.module.scss';

class Cards {
  static r = El.create('div', `${cls.toyList}`)

  constructor(root) {
    this.root = root;

    EventEmitter.subscribe('change:color', () => {
      console.log(this)

      Toy.filterColor();
      this.render();
    });
  }

  render() {
    Cards.r.innerHTML = '';

    Toy.store.forEach(element => {
      const toy = new Card(Cards.r, element)
      toy.register();
    });
  }

  async register() {
    await Toy.getList();
    const head = `
      <div class=${cls.toysHead}>игрушки</div>
    `;

    const headTpl = document.createElement('template');
    headTpl.innerHTML = head;
    this.root.append(headTpl.content);
    this.root.append(Cards.r);

    this.render();

  }
}

export default Cards;
