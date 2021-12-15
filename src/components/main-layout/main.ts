import El from '@/common/el';
import Helper from '@/common/helper';
import Cards from '../cards/cards';
import FilterColor from '../filter-color/filter-color';
import cls from './main-layout.module.scss';

class Main {
  static r = El.create('div', `${cls.toys} container`)
  static filter = El.create('div', `toys-filter col`)
  static cards = El.create('div', `toys-cards col`)

  constructor(root) {
    console.log(cls)
    this.root = root;
  }

  register() {
    console.log('++++')


    this.root.append(Main.r);
    Main.r.append(Main.filter);
    Main.r.append(Main.cards);

    const cards = new Cards(Main.cards)
    cards.register()

    const filterColor = new FilterColor(Main.filter);
    filterColor.register();
  }
}

export default Main;
