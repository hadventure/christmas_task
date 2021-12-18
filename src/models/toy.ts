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

  static filterColor() {
    const newLocal = this.filter;
    const { colors, shapes, search } = newLocal.filter;

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
      .filter((el) => el.name.includes(search));
  }
}

export default Toy;
