import Component from '@/common/component';
import El from '@/common/tag';
import { Tags } from '@/types/enums';
import Cards from '../cards/cards';
import FilterColor from '../filter-color/filter-color';
import cls from './main-layout.module.scss';

class Main extends Component {
  static container = El.create(Tags.div, `${cls.toys} container`)
  static filter = El.create(Tags.div, `toys-filter col`)
  static cards = El.create(Tags.div, `toys-cards col`)

  constructor(root: HTMLElement) {
    super(root);
  }

  register() {
    this.root.append(Main.container);
    Main.container.append(Main.filter);
    Main.container.append(Main.cards);

    const cards = new Cards(Main.cards)
    cards.register()

    const filterColor = new FilterColor(Main.filter);
    filterColor.register();
  }
}

export default Main;
