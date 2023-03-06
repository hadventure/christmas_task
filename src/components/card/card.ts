import Component from '@/common/component';
import { favQuantity } from '@/common/game-constants';
import Tag from '@/common/tag';
import { ImagesStore } from '@/models/images-store';
import Toy, { TToy } from '@/models/toy';
import { Tags } from '@/types/enums';
import Modal from '../modal/modal';
import cls from './card.module.scss';

class Card extends Component {
  private item;

  constructor(root: HTMLElement, item: TToy) {
    super(root);
    this.item = item;
  }

  register() {
    const toy = `
      <div class=${cls.toyItem}>

        <div class=${cls.toyProp}>
          <div>
            <div class=${cls.toyImageWrap}>
            </div>
            <div class=${cls.attr}>
              <div class="${cls.fav} ${this.isFavouriteToTree()}">
            </div>
          </div>
            </div>
            
          <div>
            <div class=${cls.attr}>
              <div class="attr-value">${this.item.count}</div>
            </div>

            <div class=${cls.attr}>
              <div class="attr-value">${this.item.year}</div>
            </div>

            <div class=${cls.attr}>
              <div class="attr-value">${this.item.shape}</div>
            </div>

            <div class=${cls.attr}>
              <div class="attr-value">${this.item.color}</div>
            </div>

            <div class=${cls.attr}>
              <div class="attr-value">${this.item.size}</div>
            </div>

            <div class="${cls.attr} ${cls.favToGrandma}">
              <div class="attr-value">${this.isFavouriteToGrandMa()}</div>
            </div>


          </div>

          <div class=${cls.toyName}>${this.item.name}</div>
        </div>
      </div>
    `;

    const toyTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    toyTpl.innerHTML = toy;

    const fav = <HTMLElement>toyTpl.content.querySelector(`.${cls.fav}`);

    const toyImageWrap = <HTMLElement>toyTpl.content.querySelector(`.${cls.toyImageWrap}`);
    
    const indexImage = Number(this.item.num) - 1;
    ImagesStore.images.toys[indexImage].classList.add(cls.toyImg);
    toyImageWrap.appendChild(ImagesStore.images.toys[indexImage]);

    fav.addEventListener('click', (e) => this.toggleFav(e));

    this.root.append(toyTpl.content);
  }

  isFavouriteToTree() {
    const isFav = Object.values(Toy.filter.filter.favourite).filter((el) => {
      if (el.num === this.item.num) {
        return el;
      }
      return '';
    });

    if (isFav.length > 0) {
      return cls.favourite;
    }
    return '';
  }

  isFavouriteToGrandMa() {
    if (this.item.favorite) {
      return 'да';
    }
    return 'нет';
  }

  toggleFav(e: MouseEvent) {
    const elCls = (<HTMLDivElement>e.target).classList;

    if (elCls.contains(cls.favourite)) {
      elCls.toggle(cls.favourite);
      Toy.filter.unsetFavourite(this.item.num);
    } else if (Toy.filter.filter.favourite.length === favQuantity) {
      Modal.show('Извините, все слоты заполнены');
    } else {
      elCls.toggle(cls.favourite);
      Toy.filter.setFavourite(this.item.num, this.item.count);
    }
  }
}

export default Card;
