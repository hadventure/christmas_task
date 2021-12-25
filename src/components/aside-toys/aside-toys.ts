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
      const imgWrap = Tag.create(Tags.div, cls.imgWrap);

      const counter = Tag.create(Tags.div, cls.toyCounter);
      const toyImg = <HTMLImageElement>Tag.create(Tags.img, `${cls.toyImg}`);
      toyImg.src = `./src/assets/toys/${el.num}.png`;
      imgWrap.append(toyImg);

      toy.append(imgWrap, counter);

      let currentDroppable = null;
      toyImg.addEventListener('mousedown', onMouseDown);

      function onMouseDown(event: Event) {
        const shiftX = event.clientX - this.getBoundingClientRect().left;
        const shiftY = event.clientY - this.getBoundingClientRect().top;

        console.log(this, shiftX, shiftY);
        console.log(event.pageX, event.pageY);

        const clone = this.cloneNode();

        const stl = window.getComputedStyle(this).left;
        console.log(stl, stl === 'auto');

        if(stl === 'auto') {
          imgWrap.append(clone);
        }
        
        clone.addEventListener('mousedown', onMouseDown);

        this.style.position = 'absolute';
        this.style.zIndex = 1000;

        const moveAt = (pageX, pageY) => {
          // console.log(this)
          this.style.left = `${pageX - shiftX}px`;
          this.style.top = `${pageY - shiftY}px`;
        };

        moveAt(event.pageX, event.pageY);

        const self = this;
        function onMouseMove(event) {
          // console.log(el)
          moveAt(event.pageX, event.pageY);

          self.hidden = true;
          const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          self.hidden = false;

          if (!elemBelow) return;

          const droppableBelow = elemBelow.closest('map');

          // console.log(currentDroppable);

          if (currentDroppable != droppableBelow) {
            // if (currentDroppable) { // null если мы были не над droppable до этого события
            //   // (например, над пустым пространством)

            // }
            currentDroppable = droppableBelow;
            // if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
            //   // (например, только что покинули droppable)

            // }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        this.onmouseup = function (e) {
          console.log(e);
          if (currentDroppable) {
            document.removeEventListener('mousemove', onMouseMove);
            this.onmouseup = null;
          } else {
            document.removeEventListener('mousemove', onMouseMove);
            this.onmouseup = null;
            this.remove();
          }
        };

        this.ondragstart = function () {
          return false;
        };
      }

      counter.textContent = el.count;
      this.localRoot.append(toy);
    });
  }
}

export default AsideToys;
