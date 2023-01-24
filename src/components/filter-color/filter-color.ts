import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './filter-color.module.scss';

class FilterColor extends Component {
  private colorsEl = Tag.create(Tags.div, cls.colorsWrap);

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      this.colorsEl.innerHTML = '';
      this.renderColors();
    });
  }

  renderColors() {
    const colors = ['white', 'yellow', 'red', 'blue', 'green'];

    colors.forEach((color) => {
      const e = Tag.create(Tags.div, `${cls.filterColor} ${cls[color]}`);
      e.dataset.color = color;

      if (Toy.filter.filter.colors[color]) {
        e.classList.add(cls.active);
      }

      this.colorsEl.append(e);
    });
  }

  register() {
    const name = `
      <div class=${cls.filterName}>цвет</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(wrap);
    wrap.append(nameTpl.content, this.colorsEl);

    this.renderColors();

    this.colorsEl.addEventListener('click', (e) => {
      const el = (<HTMLElement>e.target);
      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).color;
      Toy.filter.setColors(key);
    });
  }
}

export default FilterColor;
