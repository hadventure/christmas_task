import Component from '@/common/component';
import El from '@/common/tag';
import { Tags } from '@/types/enums';
import Cards from '../cards/cards';
import FilterColor from '../filter-color/filter-color';
import FilterShape from '../filter-shape/filter-shape';
import cls from './main-layout.module.scss';

class Main extends Component {
  static container = El.create(Tags.div, `${cls.toys} container`);

  static filter = El.create(Tags.div, `${cls.toysFilter} col`);

  static cards = El.create(Tags.div, 'toys-cards col');

  register() {
    this.root.append(Main.container);
    Main.container.append(Main.filter);
    Main.container.append(Main.cards);

    const cards = new Cards(Main.cards);
    cards.register();

    const wrapFilterColor = El.create(Tags.div, 'toys-cards col');
    Main.filter.append(wrapFilterColor);

    const wrapFilterShape = El.create(Tags.div, 'toys-cards col');
    Main.filter.append(wrapFilterShape);

    const filterColor = new FilterColor(wrapFilterColor);
    filterColor.register();

    const filterShape = new FilterShape(wrapFilterShape);
    filterShape.register();
  }
}

export default Main;
