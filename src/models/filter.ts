import EventEmitter from '@/common/event-emitter';
import { quizDataUrl, quizQty, quizSize } from '../common/game-constants';
import Helper from '../common/helper';

class Filter {
  constructor() {
    this.colors = []
  }

  setColors(val) {
    console.log(val)
    this.colors.push(val);
    EventEmitter.emit('change:color');
  }
}

export default Filter;
