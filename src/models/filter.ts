import EventEmitter from '@/common/event-emitter';

type TFilterNest = {
  [index: string]: boolean
};

type TFilter = {
  search: string,
  colors: TFilterNest,
  shapes: TFilterNest
};

class Filter {
  filter: TFilter;

  constructor() {
    this.filter = {
      search: '',
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
    };
  }

  setColors(val: string) {
    this.filter.colors[val] = true;
    EventEmitter.emit('change:color');
  }

  setShapes(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.shapes[val] = true;
      EventEmitter.emit('change:color');
    }
  }

  setSearch(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.shapes[val] = true;
      EventEmitter.emit('change:color');
    }
  }
}

export default Filter;
