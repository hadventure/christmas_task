import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './filter-color.module.scss';

class FilterColor extends Component {
  register() {
    const name = `
      <div class=${cls.filterName}>цвет</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const colorsEl = Tag.create(Tags.div, cls.colorsWrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(wrap);
    wrap.append(nameTpl.content);
    wrap.append(colorsEl);

    const colors = ['white', 'yellow', 'red', 'blue', 'green'];

    colors.forEach((color) => {
      const e = Tag.create(Tags.div, `${cls.filterColor} ${cls[color]}`);
      e.dataset.color = color;

      colorsEl.append(e);
    });

    colorsEl.addEventListener('click', (e) => {
      const el = (<HTMLElement>e.target);
      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).color;
      Toy.filter.setColors(key);
    });
  }
}

export default FilterColor;
