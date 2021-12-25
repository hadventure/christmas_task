import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import { TFavourite } from '@/types/types';
import cls from './tree-toy.module.scss';

export default class TreeToy extends Component {
  private counter = Tag.create(Tags.div, cls.toyCounter);

  private item: TFavourite;

  constructor(root: HTMLElement, item: TFavourite) {
    super(root);
    this.item = item;
  }

  renderCounter(count: string) {
    this.counter.textContent = count;
  }

  register() {
    const toy = Tag.create(Tags.div, `${cls.toy}`);
    const imgWrap = Tag.create(Tags.div, cls.imgWrap);

    const toyImg = <HTMLImageElement>Tag.create(Tags.img, `${cls.toyImg}`);
    toyImg.src = `./src/assets/toys/${this.item.num}.png`;
    imgWrap.append(toyImg);

    toy.append(imgWrap, this.counter);

    const self = this;
    let target: HTMLMapElement | null = null;
    function onMouseDown(event: Event) {
      const el = <HTMLImageElement>event.currentTarget;

      const pagex = (<MouseEvent>event).pageX;
      const pagey = (<MouseEvent>event).pageY;

      const x = (<MouseEvent>event).clientX;
      const y = (<MouseEvent>event).clientY;

      const shiftX = x - el.getBoundingClientRect().left;
      const shiftY = y - el.getBoundingClientRect().top;

      // console.log(el, shiftX, shiftY);
      // console.log(pagex, pagey);
      // console.log(self.item.count);

      // if (+self.item.count === 0) {
      //   const clone = el.cloneNode();

      //   const stl = window.getComputedStyle(el).left;

      //   console.log()
      //   // if (stl === 'auto') {
      //   imgWrap.append(clone);
      //   // }

      //   // clone.addEventListener('mousedown', onMouseDown);
      // }

      if (+self.item.count - 1 !== 0) {
        const clone = el.cloneNode();

        const stl = window.getComputedStyle(el).left;

        if (stl === 'auto') {
          imgWrap.append(clone);
        }

        clone.addEventListener('mousedown', onMouseDown);
      }

      el.style.position = 'absolute';
      el.style.zIndex = '1000';

      const moveAt = (pageX: number, pageY: number) => {
        el.style.left = `${pageX - shiftX}px`;
        el.style.top = `${pageY - shiftY}px`;
      };

      moveAt(pagex, pagey);

      function onMouseMove(e: MouseEvent) {
        moveAt(e.pageX, e.pageY);

        el.hidden = true;
        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        el.hidden = false;

        if (!elemBelow) return;

        const droppableBelow = elemBelow.closest('map');

        if (target !== droppableBelow) {
          if (target) { // null если мы были не над droppable до этого события
            // (например, над пустым пространством)
            console.log('уменьшаем счетчик');
          }
          target = droppableBelow;
          if (target) { // null если мы не над droppable сейчас, во время этого события
            // (например, только что покинули droppable)
            console.log('увеличиваем счетчик');
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      el.onmouseup = () => {
        if (target) {
          if (el.classList.contains('on-tree') === false) {
            el.classList.add('on-tree');
            self.item.count = String(+self.item.count - 1);
            self.renderCounter(self.item.count);
          }

          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
        } else {
          if (+self.item.count === 0) {
            const toyImg1 = <HTMLImageElement>Tag.create(Tags.img, `${cls.toyImg}`);
            toyImg1.src = `./src/assets/toys/${self.item.num}.png`;
            imgWrap.append(toyImg1);
            toyImg1.addEventListener('mousedown', onMouseDown);
          }

          if (el.classList.contains('on-tree')) {
            self.item.count = String(+self.item.count + 1);
            self.renderCounter(self.item.count);
          }

          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
          el.remove();
        }
      };

      el.ondragstart = () => false;
    }

    toyImg.addEventListener('mousedown', onMouseDown);

    this.renderCounter(this.item.count);
    this.root.append(toy);
  }
}
