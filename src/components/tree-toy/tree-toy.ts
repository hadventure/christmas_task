import { Component } from '@/common/component';
import { EventEmitter } from '@/common/event-emitter';
import { Tag } from '@/common/tag';
import { Tags } from '@/types/enums';
import { TFavourite } from '@/types/types';
import cls from './tree-toy.module.scss';

class TreeToy extends Component {
  private counter = Tag.create(Tags.div, cls.toyCounter);

  private item: TFavourite;

  private image!: HTMLElement;

  private count: number;

  constructor(root: HTMLElement, item: TFavourite) {
    super(root);
    this.item = item;
    this.count = Number(this.item.count);
  }

  renderCounter() {
    this.counter.textContent = String(this.count);
  }

  register() {
    const toy = Tag.create(Tags.div, `${cls.toy}`);
    const imgWrap = Tag.create(Tags.div, cls.imgWrap);

    const src = new Image();
    src.src = `./src/assets/toys/${this.item.num}.png`;

    const image = src;
    image.classList.add(cls.toyImg);
    image.draggable = true;
    image.dataset.num = this.item.num;
    image.style.zIndex = '10';
    imgWrap.append(image);

    toy.append(imgWrap, this.counter);

    EventEmitter.subscribe(`clone${this.item.num}`, () => {
      if (this.count > 1) {
        const clone = new Image();
        clone.src = `./src/assets/toys/${this.item.num}.png`;

        this.image = clone;
        this.image.classList.add(cls.toyImg);
        this.image.draggable = true;
        this.image.dataset.num = this.item.num;
        this.image.classList.add(cls.clonable);
        imgWrap.append(this.image);
      }
    });

    EventEmitter.subscribe(`close${this.item.num}`, () => {
      if (this.image) {
        this.image.classList.remove(cls.clonable);
      }

      this.count = +this.count - 1;
      this.renderCounter();
    });

    EventEmitter.subscribe(`begin${this.item.num}`, () => {
      if (this.count === 0) {
        const clone = new Image();
        clone.src = `./src/assets/toys/${this.item.num}.png`;

        const initializedImage = clone;
        initializedImage.classList.add(cls.toyImg);
        initializedImage.draggable = true;
        initializedImage.dataset.num = this.item.num;
        initializedImage.style.zIndex = '10';
        imgWrap.append(initializedImage);
      }

      this.count = +this.count + 1;
      this.renderCounter();
    });

    this.renderCounter();
    this.root.append(toy);
  }
}

export { TreeToy };
