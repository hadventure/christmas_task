import Component from '@/common/component';
import { favQuantity } from '@/common/game-constants';
import LS from '@/common/local-storage';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import TreeToy from '../tree-toy/tree-toy';
import cls from './aside-toys.module.scss';

class AsideToys extends Component {
  private localRoot = Tag.create(Tags.div, `${cls.toyList}`);

  private counter = Tag.create(Tags.div, cls.toyCounter);

  renderCounter(count: string) {
    this.counter.textContent = count;
  }

  async register() {
    // TODO: remove after navigation
    await Toy.getList();

    this.root.append(this.localRoot);

    let toysForTree;

    if (LS.ls.fav.length > 0) {
      const nums = Toy.store.map((el) => el.num);

      toysForTree = LS.ls.fav.filter((el) => nums.includes(el.num));
    } else {
      toysForTree = Toy.store.filter((el, i) => {
        if (i < favQuantity) {
          return el;
        }

        return false;
      });
    }

    toysForTree.forEach((el) => {
      const toyEl = new TreeToy(this.localRoot, el);
      toyEl.register();
    });
  }
}

export default AsideToys;
