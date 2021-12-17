import Component from '@/common/component';
import El from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './filter-color.module.scss';

class FilterColor extends Component {
  constructor(root: HTMLElement) {
    super(root);
  }

  register() {
    const name = `
      <div class=${cls.filterName}>цвет</div>
  `;

    const wrap = El.create(Tags.div);
    const colorsEl = El.create(Tags.div, cls.colorsWrap);
    const nameTpl = document.createElement(Tags.tpl);
    nameTpl.innerHTML = name;
    
    this.root.append(wrap);
    wrap.append(nameTpl.content);
    wrap.append(colorsEl)

    const colors = ['white', 'yellow', 'red', 'blue', 'green']

    colors.forEach(color => {
      const e = El.create(Tags.div, `${cls.filterColor} ${cls[color]}`)
      e.dataset.color = color;

      colorsEl.append(e);
    })

    colorsEl.addEventListener('click', e => {
      e.target.classList.add(cls.active);
      Toy.filter.setColors(e.target.dataset.color);
    })
  }
}

export default FilterColor;
