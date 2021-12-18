import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import Cards from '../cards/cards';
import FilterColor from '../filter-color/filter-color';
import FilterShape from '../filter-shape/filter-shape';
import FilterSearch from '../search/search';
import cls from './main-layout.module.scss';

class Main extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} container`);

  private filter = Tag.create(Tags.div, `${cls.toysFilter} col`);

  private cards = Tag.create(Tags.div, 'toys-cards col');

  register() {
    this.root.append(this.container);
    this.container.append(this.filter);
    this.container.append(this.cards);

    const cards = new Cards(this.cards);
    cards.register();

    const wrapFilterSearch = Tag.create(Tags.div, 'toys-cards col');
    this.filter.append(wrapFilterSearch);

    const wrapFilterColor = Tag.create(Tags.div, 'toys-cards col');
    this.filter.append(wrapFilterColor);

    const wrapFilterShape = Tag.create(Tags.div, 'toys-cards col');
    this.filter.append(wrapFilterShape);

    const search = new FilterSearch(wrapFilterSearch);
    search.register();

    const filterColor = new FilterColor(wrapFilterColor);
    filterColor.register();

    const filterShape = new FilterShape(wrapFilterShape);
    filterShape.register();
  }
}

export default Main;
