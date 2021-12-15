import Filter from '@/models/filter';
import cls from './card.module.scss';

class Card {
  constructor(root, el) {
    // console.log(root, el)
    this.root = root;
    this.el = el;
  }

  register() {
    // console.log('card++++', this.el)
    
    const toy = `
      <div class=${cls.toyItem}>
        <div class="toy-name">${this.el.name}</div>
        <div class=${cls.toyImageWrap}>
          <img src="./src/assets/toys/${this.el.num}.png" alt="" class=${cls.toyImg}>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Количество:</div>
          <div class="attr-value">${this.el.count}</div>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Год покупки:</div>
          <div class="attr-value">${this.el.year}</div>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Форма игрушки:</div>
          <div class="attr-value">${this.el.shape}</div>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Цвет игрушки:</div>
          <div class="attr-value">${this.el.color}</div>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Размер игрушки:</div>
          <div class="attr-value">${this.el.size}</div>
        </div>

        <div class=${cls.attr}>
          <div class="attr-name">Любимая:</div>
          <div class="attr-value">${this.el.favorite}</div>
        </div>
      </div>
    `;

    const toyTpl = document.createElement('template');
    toyTpl.innerHTML = toy;

    this.root.append(toyTpl.content);


  }
}

export default Card;
