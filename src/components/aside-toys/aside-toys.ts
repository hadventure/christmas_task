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

      let currentDroppable = null;

      toyImg.onmousedown = function (event) {
        const shiftX = event.clientX - toyImg.getBoundingClientRect().left;
        const shiftY = event.clientY - toyImg.getBoundingClientRect().top;

        console.log(shiftX, shiftY);

        toyImg.style.position = 'absolute';
        toyImg.style.zIndex = 1000;
        document.body.append(toyImg);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          toyImg.style.left = `${pageX - shiftX}px`;
          toyImg.style.top = `${pageY - shiftY}px`;
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          toyImg.hidden = true;
          const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          toyImg.hidden = false;

          if (!elemBelow) return;

          const droppableBelow = elemBelow.closest('area');

          console.log(elemBelow);

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null если мы были не над droppable до этого события
              // (например, над пустым пространством)
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
              // (например, только что покинули droppable)
              enterDroppable(currentDroppable);
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        toyImg.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          toyImg.onmouseup = null;
        };
      };


      function enterDroppable(elem) {
        elem.style.background = 'pink';
      }
  
      function leaveDroppable(elem) {
        elem.style.background = '';
      }
  
      toyImg.ondragstart = function() {
        return false;
      };

      counter.textContent = el.count;
      this.localRoot.append(toy);
    });
  }
}

export default AsideToys;
