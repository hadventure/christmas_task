import EventEmitter from '@/common/event-emitter';

type tColors = {
  [index: string]: boolean
}

class Filter {
  colors: tColors

  constructor() {
    this.colors = {
      white: false,
      yellow: false,
      red: false,
      blue: false,
      green: false,
    }
  }

  setColors(val: string) {
    this.colors[val] = true;
    EventEmitter.emit('change:color');
  }
}

export default Filter;
