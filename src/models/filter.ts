import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';
import { TFilter, TSorter } from '@/types/types';

class Filter {
  filter: TFilter;

  sorter: TSorter;

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
      sizes: {
        S: false,
        M: false,
        L: false,
      },
      yearRange: {
        percent: [],
        years: [],
      },
      qtyRange: {
        percent: [],
        years: [],
      },
    };

    this.sorter = {
      name: '',
      direction: '',
    };
  }

  setColors(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.colors[val] = true;
      EventEmitter.emit('change:filter');
    }

    this.setFilterToLs();
  }

  setShapes(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.shapes[val] = true;
      EventEmitter.emit('change:filter');
    }

    this.setFilterToLs();
  }

  setSearch(val: string) {
    this.filter.search = val;
    EventEmitter.emit('change:filter');
    this.setFilterToLs();
  }

  setFavourite(val: string, count: string) {
    this.filter.favourite.push({ num: val, count });

    LS.setFavourite(this.filter.favourite);
    EventEmitter.emit('change:favourite');
  }

  unsetFavourite(val: string) {
    let pos;
    this.filter.favourite.forEach((el, i) => {
      if (el.num === val) {
        pos = i;
      }
    });

    if (typeof pos === 'number') {
      this.filter.favourite.splice(pos, 1);
      LS.setFavourite(this.filter.favourite);
      EventEmitter.emit('change:favourite');
    }
  }

  toggleFav() {
    this.filter.isFavourite = !this.filter.isFavourite;
    EventEmitter.emit('change:filter');

    this.setFilterToLs();
  }

  setSorter(val: string) {
    const [name, direction] = val.split('-');

    this.sorter.name = name;
    this.sorter.direction = direction;

    LS.setSorterToLs(this.sorter);

    EventEmitter.emit('change:sorter');
  }

  setPercent(type: string, min: string, max: string) {
    if (type === 'qtyRange') {
      this.filter[type].percent = [];
      this.filter[type].percent.push(min, max);
    }

    if (type === 'yearRange') {
      this.filter[type].percent = [];
      this.filter[type].percent.push(min, max);
    }

    this.setFilterToLs();
  }

  setValues(type: string, min: string, max: string) {
    if (type === 'qtyRange') {
      this.filter[type].years = [];
      this.filter[type].years.push(min, max);
    }

    if (type === 'yearRange') {
      this.filter[type].years = [];
      this.filter[type].years.push(min, max);
    }

    this.setFilterToLs();
    EventEmitter.emit('change:filter');
  }

  setFilterToLs() {
    LS.setData(this.filter);
  }

  setSize(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.sizes[val] = !this.filter.sizes[val];
      this.setFilterToLs();

      EventEmitter.emit('change:filter');
    }
  }
}

export default Filter;
