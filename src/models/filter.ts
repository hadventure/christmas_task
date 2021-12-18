import EventEmitter from '@/common/event-emitter';

type tFilter = {
  [index: string]: {
    [index: string]: boolean
  }
}

class Filter {
  filter: tFilter

  constructor() {
    this.filter = {
      colors: {
        white: false,
        yellow: false,
        red: false,
        blue: false,
        green: false,
      },
      shapes: {
        ball: false,
        bell: false,
        toy: false,
        pine: false,
        snowflake: false,
        star: false,
      },
    }
  }

  setColors(val: string) {
    this.filter.colors[val] = true;
    EventEmitter.emit('change:color');
  }

  setShapes(val: string) {
    this.filter.shapes[val] = true;
    EventEmitter.emit('change:color');
  }
}

export default Filter;
