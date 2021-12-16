import EventEmitter from '@/common/event-emitter';

class Filter {
  colors: string[]

  constructor() {
    this.colors = []
  }

  setColors(val: string) {
    this.colors.push(val);
    EventEmitter.emit('change:color');
  }
}

export default Filter;
