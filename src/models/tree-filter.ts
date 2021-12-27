import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';
import { TTreeFilter } from '@/types/types';

export default class TreeFilter {
  filter: TTreeFilter;

  constructor() {
    this.filter = {
      tree: '',
      bg: '',
      garland: '',
      player: false,
      snow: false,
    };
  }

  setTree(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.tree = val;
      EventEmitter.emit('change:tree');
    }

    this.setFilterToLs();
  }

  setBg(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.bg = val;
      EventEmitter.emit('change:bg');
    }

    this.setFilterToLs();
  }

  setGarland(val: string | undefined) {
    if (typeof val === 'string') {
      this.filter.garland = val;
      EventEmitter.emit('change:garland');
    }

    this.setFilterToLs();
  }

  unsetGarland() {
    this.filter.garland = '';
    EventEmitter.emit('change:garland');
    this.setFilterToLs();
  }

  setFilterToLs() {
    LS.setTreeInfo(this.filter);
  }

  togglePlayer() {
    this.filter.player = !this.filter.player;
    LS.setTreeInfo(this.filter);
    EventEmitter.emit('toggle:audio');
  }

  toggleSnow() {
    this.filter.snow = !this.filter.snow;
    LS.setTreeInfo(this.filter);
    EventEmitter.emit('toggle:snow');
  }
}
