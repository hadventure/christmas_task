import { Colors, Shapes } from '@/types/enums';
import { toyUrl } from '../common/game-constants';
import Filter from './filter';

export type tToy = {
  color: string
  count: string
  favorite: boolean
  name: string
  num: string
  shape: string
  size: string
  year: string
}

class Toy {
  static filter = new Filter()
  static store: tToy[]
  static filterd: tToy[]

  static async getList() {
    const res = await fetch(toyUrl);
    const data = await res.json();
    this.store = data;
    this.filterd = data;
  }

  static filterColor() {
    console.log(this.filter)

    const newLocal = this.filter;
    const {colors, shapes} = newLocal.filter;

    console.log(newLocal, colors, shapes);

    const merge = Object.keys(colors)
      .filter(el => colors[el])
      .map(el => Colors[el]);

    const merge1 = Object.keys(shapes)
      .filter(el => shapes[el])
      .map(el => Shapes[el]);

     
      console.log(this.filterd)

      this.filterd = this.store
      .filter(el => {
        if(merge1.length > 0) {
          return merge1.includes(el.shape);
        }

        return el;
      })
      .filter(el => {
        if(merge.length > 0) {
          return merge.includes(el.color);
        }

        return el;
      })
  }
}

export default Toy;
