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

  static async getList() {
    const res = await fetch(toyUrl);
    const data = await res.json();
    this.store = data;
  }

  static filterColor() {
    this.store = [this.store[0]];
  }
}

export default Toy;
