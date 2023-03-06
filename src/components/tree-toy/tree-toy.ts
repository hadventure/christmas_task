import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import { ImagesStore } from '@/models/images-store';
import { Tags } from '@/types/enums';
import { TFavourite } from '@/types/types';
import cls from './tree-toy.module.scss';

export default class TreeToy extends Component {
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

    const indexImage = Number(this.item.num) - 1;
    const image = ImagesStore.images.toys[indexImage].cloneNode(true) as HTMLImageElement;
    image.classList.add(cls.toyImg);
    image.draggable = true;
    image.dataset.num = this.item.num;
    image.style.zIndex = '10';
    imgWrap.append(image);

    toy.append(imgWrap, this.counter);

    EventEmitter.subscribe(`clone${this.item.num}`, () => {
      if (this.count > 1) {
        const indexImage = Number(this.item.num) - 1;
        this.image = ImagesStore.images.toys[indexImage].cloneNode(true) as HTMLImageElement;
        this.image.classList.add(cls.toyImg);
        this.image.draggable = true;
        this.image.dataset.num = this.item.num;
        this.image.classList.add(cls.clonable);
        imgWrap.append(this.image);
      }
    });

    EventEmitter.subscribe(`close${this.item.num}`, () => {
      this.image.classList.remove(cls.clonable);

      this.count = +this.count - 1;
      this.renderCounter();
    });

    EventEmitter.subscribe(`begin${this.item.num}`, () => {
      if (this.count === 0) {
        const indexImage = Number(this.item.num) - 1;
        const image = ImagesStore.images.toys[indexImage].cloneNode(true) as HTMLImageElement;
        image.classList.add(cls.toyImg);
        image.draggable = true;
        image.dataset.num = this.item.num;
        image.style.zIndex = '10';
        imgWrap.append(image);
      }

      this.count = +this.count + 1;
      this.renderCounter();
    });

    this.renderCounter();
    this.root.append(toy);
  }
}
