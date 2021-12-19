import { Colors, Shapes } from '@/types/enums';
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
  }

  static filterList() {
    const newLocal = this.filter;
    const {
      colors, shapes, search, favourite, isFavourite, yearRange, qtyRange,
    } = newLocal.filter;

    const merge = Object.keys(colors)
      .filter((el) => colors[el])
      .map((el) => Colors[el as keyof typeof Colors]);

    const merge1 = Object.keys(shapes)
      .filter((el) => shapes[el])
      .map((el) => Shapes[el as keyof typeof Shapes]);

    this.filterd = this.store
      .filter((el: TToy) => {
        if (merge1.length > 0) return merge1.includes(el.shape);
        return el;
      })
      .filter((el) => {
        if (merge.length > 0) return merge.includes(el.color);
        return el;
      })
      .filter((el) => el.name.includes(search.toLowerCase()))
      .filter((el) => {
        if (isFavourite) {
          return favourite.includes(el.num);
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
}

export default Toy;
