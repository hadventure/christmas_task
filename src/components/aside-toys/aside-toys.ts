import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import { favQuantity } from '@/common/game-constants';
import LS from '@/common/local-storage';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import TreeToy from '../tree-toy/tree-toy';
import cls from './aside-toys.module.scss';
import cls1 from '../../views/tree-layout/tree-layout.module.scss';

class AsideToys extends Component {
  private localRoot = Tag.create(Tags.div, `${cls.toyList}`);

  private counter = Tag.create(Tags.div, cls.toyCounter);

  renderCounter(count: string) {
    this.counter.textContent = count;
  }

  async register() {
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

    let dragged: HTMLElement;
    let draggedCopy: HTMLElement;

    const handleDragEnd = (e: Event) => {
      e.preventDefault();

      if (dragged.classList.contains('ontree')) {
        if (!dragged.classList.contains('continue')) {
          EventEmitter.emit(`close${dragged.dataset.num}`);
        }
      }
    };

    const handleDragOver = (e: Event) => {
      e.preventDefault();
    };

    const handleDrop = (e: Event) => {
      e.preventDefault();
      const tree1 = document.querySelector(`.${cls1.tree}`) as HTMLElement;
      console.log('test');
      const target = e.target as HTMLElement;
      if (target.closest('polygon')) {
        const tree = target.closest(`.${cls1.tree}`) as HTMLElement;
        const { offsetX, offsetY } = (<MouseEvent>e);

        dragged.style.position = 'absolute';
        dragged.style.zIndex = '1000';

        dragged.style.left = `${(offsetX * 100) / tree.clientWidth}%`;
        dragged.style.top = `${((offsetY - 21) * 100) / tree.clientHeight}%`;

        if (dragged.classList.contains('ontree')) {
          if (!dragged.classList.contains('continue')) {
            dragged.classList.add('continue');
          }
        }

        if (!dragged.classList.contains('ontree')) {
          dragged.classList.add('ontree');
        }

        tree.appendChild(dragged);
      } else if (dragged.classList.contains('ontree')) {
        console.log(target.closest('img'));

        if (target.closest('img') !== null) {
          tree1.appendChild(draggedCopy);
          dragged.remove();
        } else {
          dragged.remove();
          EventEmitter.emit(`begin${dragged.dataset.num}`);
        }
      }
    };

    const handleDragStart = (e: Event) => {
      dragged = e.target as HTMLElement;
      draggedCopy = dragged.cloneNode(true) as HTMLImageElement;
      EventEmitter.emit(`clone${dragged.dataset.num}`);
    };

    EventEmitter.subscribe('remove', () => {
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('dragend', handleDragEnd);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    });

    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);
  }
}

export default AsideToys;
