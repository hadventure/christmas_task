import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';

type TFilterNest = {
  [index: string]: boolean
};

type TFilter = {
  // It's possible to set fav to any data collection
  favourite: string[],
  isFavourite: boolean,
  search: string,
  colors: TFilterNest,
  shapes: TFilterNest
};

class Filter {
  filter: TFilter;

  constructor() {
    this.filter = {
      favourite: [],
      isFavourite: false,
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

  setColors(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.colors[val] = true;
      EventEmitter.emit('change:filter');
    }
  }

  setShapes(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.shapes[val] = true;
      EventEmitter.emit('change:filter');
    }
  }

  setSearch(val: string) {
    this.filter.search = val;
    EventEmitter.emit('change:filter');
  }

  setFavourite(val: string) {
    this.filter.favourite.push(val);
    LS.setFavourite(this.filter.favourite);
    EventEmitter.emit('change:favourite');
  }

  unsetFavourite(val: string) {
    const pos = this.filter.favourite.indexOf(val);
    this.filter.favourite.splice(pos, 1);
    LS.setFavourite(this.filter.favourite);
    EventEmitter.emit('change:favourite');
  }

  toggleFav() {
    this.filter.isFavourite = !this.filter.isFavourite;
    EventEmitter.emit('change:filter');
  }
}

export default Filter;
