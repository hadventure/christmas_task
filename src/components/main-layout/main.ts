import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import Cards from '../cards/cards';
import FilterColor from '../filter-color/filter-color';
import FilterFav from '../filter-fav/filter-fav';
import FilterReset from '../filter-reset/filter-reset';
import FilterShape from '../filter-shape/filter-shape';
import Range from '../range/range';
import FilterSearch from '../search/search';
import Sorter from '../sorter/sorter';
import cls from './main-layout.module.scss';

class Main extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} container`);

  private filter = Tag.create(Tags.div, `${cls.toysFilter} col`);

  private cards = Tag.create(Tags.div, 'toys-cards col');

  register() {
    this.root.append(this.container);
    this.container.append(this.filter, this.cards);

    const cards = new Cards(this.cards);
    cards.register();

    const wrapFilterSearch = Tag.create(Tags.div, 'toys-cards col');
    const wrapFilterColor = Tag.create(Tags.div, 'toys-cards col');
    const wrapFilterShape = Tag.create(Tags.div, 'toys-cards col');
    const wrapFilterFav = Tag.create(Tags.div, 'toys-cards col');
    const wrapSorter = Tag.create(Tags.div, 'toys-cards col');
    const wrapRangeYear = Tag.create(Tags.div, 'toys-cards col');
    const wrapRangeQty = Tag.create(Tags.div, 'toys-cards col');
    // const wrapReset = Tag.create(Tags.div, 'toys-cards col');

    this.filter.append(
      // wrapReset,
      wrapFilterSearch,
      wrapFilterColor,
      wrapFilterShape,
      wrapFilterFav,
      wrapSorter,
      wrapRangeYear,
      wrapRangeQty,
    );

    const search = new FilterSearch(wrapFilterSearch);
    search.register();

    const filterColor = new FilterColor(wrapFilterColor);
    filterColor.register();

    const filterShape = new FilterShape(wrapFilterShape);
    filterShape.register();

    const filterFav = new FilterFav(wrapFilterFav);
    filterFav.register();

    const sorter = new Sorter(wrapSorter);
    sorter.register();

    // TODO: set Dynamicly
    const rangeYear = new Range(wrapRangeYear, '1940', '2020', 'yearRange', 'Год');
    rangeYear.register();

    const rangeQty = new Range(wrapRangeQty, '1', '15', 'qtyRange', 'Количество');
    rangeQty.register();

    // const reset = new FilterReset(wrapReset);
    // reset.register();
  }
}

export default Main;
