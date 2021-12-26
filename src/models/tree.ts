import { Colors, Shapes } from '@/types/enums';
import TreeFilter from './tree-filter';

// export type TToy = {
//   color: Colors
//   count: string
//   favorite: boolean
//   name: string
//   num: string
//   shape: Shapes
//   size: string
//   year: string
// };

class Toy {
  static filter = new TreeFilter();



  // static resetFilter() {
  //   this.filter = new Filter();
  //   this.filter.filter.favourite = LS.ls.fav;
  //   this.filter.sorter = LS.ls.sorter;
  //   LS.setData(this.filter.filter);
  //   LS.setSorterToLs(this.filter.sorter);

  //   EventEmitter.emit('reset:filter');
  // }

  // // TODO: it needs to be refactored
  // static resetStorage() {
  //   LS.ls.fav = [];
  //   this.filter = new Filter();
  //   this.filter.filter.favourite = [];

  //   this.filter.sorter = {
  //     name: '',
  //     direction: '',
  //   };

  //   LS.setSorterToLs(this.filter.sorter);
  //   LS.setData(this.filter.filter);

  //   EventEmitter.emit('reset:filter');
  //   EventEmitter.emit('reset:storage');
  // }
}

export default Toy;
