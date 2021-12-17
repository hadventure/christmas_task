import { Colors } from '@/types/enums';
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
    const merge = Object.keys(this.filter.colors)
      .filter(el => this.filter.colors[el])
      .map(el => Colors[el]);

    this.filterd = this.store.filter(el => {
      console.log(merge.includes(el.color))
      return merge.includes(el.color);
    })
  }
}

export default Toy;
