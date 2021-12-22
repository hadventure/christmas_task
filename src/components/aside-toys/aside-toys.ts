import Component from '@/common/component';
import { favQuantity } from '@/common/game-constants';
import LS from '@/common/local-storage';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './aside-toys.module.scss';

class AsideToys extends Component {
  private localRoot = Tag.create(Tags.div, `${cls.toyList}`);

  async register() {
    // TODO: remove after navigation
    await Toy.getList();

    this.root.append(this.localRoot);

    let toysForTree;


    if (LS.ls.fav.length > 0) {
      toysForTree = Toy.store.filter((el) => LS.ls.fav.includes(el.num));
    } else {
      toysForTree = Toy.store.filter((el, i) => {
        if (i < favQuantity) {
          return el;
        }

        return false;
      });
    }

    toysForTree.forEach((el) => {
      const toy = Tag.create(Tags.div, `${cls.toy}`);
      // toy.textContent = el.count;
      const counter = Tag.create(Tags.div, cls.toyCounter);
      const toyImg = <HTMLImageElement>Tag.create(Tags.img, `${cls.toyImg}`);
      toyImg.src = `./src/assets/toys/${el.num}.png`;
      toy.append(toyImg, counter);

      counter.textContent = el.count;
      this.localRoot.append(toy);
    });
  }
}

export default AsideToys;
