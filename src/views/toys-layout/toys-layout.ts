import { Component } from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import Cards from '../../components/cards/cards';
import FilterColor from '../../components/filter-color/filter-color';
import FilterFav from '../../components/filter-fav/filter-fav';
import FilterShape from '../../components/filter-shape/filter-shape';
import Range from '../../components/range/range';
import FilterSearch from '../../components/search/search';
import Sorter from '../../components/sorter/sorter';
import cls from './toys-layout.module.scss';
import FilterSize from '../../components/filter-size/filter-size';
import Header from '../../components/header/header';
import { lng } from '@/language/lng';

class Main extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} content`);

  private filter = Tag.create(Tags.div, `${cls.toysFilter}`);

  private cards = Tag.create(Tags.div, 'toys-cards col');

  register() {
    const wrapHeader = Tag.create(Tags.div, cls.cardBorder);

    const header = new Header(wrapHeader);
    header.register();

    this.root.append(wrapHeader, this.container);
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
    const wrapFilterSize = Tag.create(Tags.div, 'toys-cards col');

    this.filter.append(
      wrapFilterSearch,
      wrapFilterColor,
      wrapFilterShape,
      wrapFilterFav,
      wrapSorter,
      wrapFilterSize,
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

    const rangeYear = new Range(wrapRangeYear, '1940', '2020', 'yearRange', lng.year);
    rangeYear.register();

    const rangeQty = new Range(wrapRangeQty, '1', '15', 'qtyRange', lng.qty);
    rangeQty.register();

    const filterSize = new FilterSize(wrapFilterSize);
    filterSize.register();
  }
}

export default Main;
