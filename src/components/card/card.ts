import Component from '@/common/component';
import El from '@/common/tag';
import { tToy } from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './card.module.scss';

class Card extends Component {
  private item;

  constructor(root: HTMLElement, item: tToy) {
    super(root);
    this.item = item;
  }

  register() {
    const toy = `
      <div class=${cls.toyItem}>

    <div class=${cls.toyProp}>
      <div class=${cls.toyImageWrap}>
        <img src="./src/assets/toys/${this.item.num}.png" alt="" class=${cls.toyImg}>
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

        <div class=${cls.attr}>
          <div class="attr-value">${this.item.favorite}</div>
        </div>
        </div>
        <div class=${cls.toyName}>${this.item.name}</div>
    </div
        
      </div>
    `;

    const toyTpl = <HTMLTemplateElement>El.create(Tags.tpl);
    toyTpl.innerHTML = toy;

    this.root.append(toyTpl.content);
  }
}

export default Card;
