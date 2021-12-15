import { quizDataUrl, quizQty, quizSize } from '../common/game-constants';
import Helper from '../common/helper';
import Filter from './filter';

class Toy {
  static filter = new Filter()
  static store

  static async getList() {
    const res = await fetch(quizDataUrl);
    const data = await res.json();
    this.store = data;
  }

  static filterColor() {
    this.store = [this.store[0]];
  }
}

export default Toy;
