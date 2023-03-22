import { EventEmitter } from '@/common/event-emitter';
import { LS } from '@/common/local-storage';
import { Colors, Shapes, Sizes } from '@/types/enums';
import { toyUrl } from '../common/game-constants';
import Filter from './filter';

export type TToy = {
  color: Colors
  count: string
  favorite: boolean
  name: string
  num: string
  shape: Shapes
  size: string
  year: string
};

class Toy {
  static filter = new Filter();

  static store: TToy[];

  static filterd: TToy[];

  static async getList() {
    const res = await fetch(toyUrl);
    const data = await res.json();
    this.store = data;
    this.filterd = data;

    if (!LS.ls.filter) {
      LS.setData(this.filter.filter);
    } else {
      this.filter.filter = { ...LS.ls.filter };
      EventEmitter.emit('change:filter');
    }
  }

  static filterList() {
    const newLocal = this.filter;
    const {
      colors, sizes, shapes, search, isFavourite, yearRange, qtyRange,
    } = newLocal.filter;

    const mergeColors = Object.keys(colors)
      .filter((el) => colors[el])
      .map((el) => Colors[el as keyof typeof Colors]);

    const mergeShapes = Object.keys(shapes)
      .filter((el) => shapes[el])
      .map((el) => Shapes[el as keyof typeof Shapes]);

    const mergeSizes = Object.keys(sizes)
      .filter((el) => sizes[el])
      .map((el) => String(Sizes[el as keyof typeof Sizes]));

    this.filterd = this.store
      .filter((el) => {
        if (mergeShapes.length > 0) return mergeShapes.includes(el.shape);
        return el;
      })
      .filter((el) => {
        if (mergeColors.length > 0) return mergeColors.includes(el.color);
        return el;
      })
      .filter((el) => {
        if (mergeSizes.length > 0) return mergeSizes.includes(el.size);
        return el;
      })
      .filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
      .filter((el) => {
        if (isFavourite) {
          return el.favorite;
        }
        return el;
      })
      .filter((el) => {
        if (yearRange.years.length) {
          return +el.year >= +yearRange.years[0] && +el.year <= +yearRange.years[1];
        }

        return el;
      })
      .filter((el) => {
        if (qtyRange.years.length) {
          return +el.count >= +qtyRange.years[0] && +el.count <= +qtyRange.years[1];
        }

        return el;
      });
  }

  static sortList() {
    const { name, direction } = this.filter.sorter;

    this.filterd = this.filterd.sort((a: TToy, b: TToy): number => {
      if (direction === 'asc') {
        if (a[name as keyof TToy] < b[name as keyof TToy]) {
          return -1;
        }

        if (a[name as keyof TToy] > b[name as keyof TToy]) {
          return 1;
        }
      }

      if (direction === 'desc') {
        if (a[name as keyof TToy] > b[name as keyof TToy]) {
          return -1;
        }

        if (a[name as keyof TToy] < b[name as keyof TToy]) {
          return 1;
        }
      }

      return 0;
    });
  }

  static resetFilter() {
    this.filter = new Filter();
    this.filter.filter.favourite = LS.ls.fav;
    this.filter.sorter = LS.ls.sorter;
    LS.setData(this.filter.filter);
    LS.setSorterToLs(this.filter.sorter);

    EventEmitter.emit('reset:filter');
  }

  static resetStorage() {
    LS.ls.fav = [];
    this.filter = new Filter();
    this.filter.filter.favourite = [];

    this.filter.sorter = {
      name: '',
      direction: '',
    };

    LS.setSorterToLs(this.filter.sorter);
    LS.setData(this.filter.filter);

    EventEmitter.emit('reset:filter');
    EventEmitter.emit('reset:storage');
  }
}

export default Toy;
