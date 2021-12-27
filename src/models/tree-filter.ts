import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';

export default class TreeFilter {
  filter: any;

  constructor() {
    this.filter = {
      tree: '',
      bg: '',
      garland: '',
      player: false,
    };
  }

  setTree(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.tree = val;
      EventEmitter.emit('change:tree');
    }

    // this.setFilterToLs();
  }

  setBg(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.bg = val;
      EventEmitter.emit('change:bg');
    }

    // this.setFilterToLs();
  }

  setGarland(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.garland = val;
      EventEmitter.emit('change:garland');
    }

    // this.setFilterToLs();
  }

  unsetGarland() {
    this.filter.garland = '';
    EventEmitter.emit('change:garland');
    // this.setFilterToLs();
  }

  setFilterToLs() {
    LS.setData(this.filter);
  }

  togglePlayer() {
    this.filter.player = !this.filter.player;
    EventEmitter.emit('toggle:audio');
  }
}
