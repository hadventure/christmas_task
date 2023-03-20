import EventEmitter from '@/common/event-emitter';
import LS from '@/common/local-storage';
import TreeFilter from './tree-filter';

export default class Tree {
  static filter = new TreeFilter();

  static resetFilter() {
    this.filter = new TreeFilter();
    LS.setTreeInfo(this.filter.filter);

    EventEmitter.emit('reset:tree-filter');
  }

  static setInitialTreeFilter() {
    Tree.filter.filter = LS.ls.tree;
  }
}
