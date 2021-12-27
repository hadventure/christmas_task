import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Garlands, Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './filter-garland.module.scss';
import Tree from '@/models/tree';

export default class FilterGarland extends Component {
  private colorsEl = Tag.create(Tags.div, cls.colorsWrap);

  renderColors() {
    const colors = [Garlands.yellow, Garlands.aqua, Garlands.pink, Garlands.green, Garlands.multi];

    colors.forEach((color) => {
      const e = Tag.create(Tags.div, `${cls.filterColor} ${cls[color]}`);
      e.dataset.color = color;
      e.style.background = color;

      if (Tree.filter.filter.garland === color) {
        e.classList.add(cls.active);
      }

      this.colorsEl.append(e);
    });
  }

  register() {
    const name = `
      <div class=${app.filterName}>Гирлянда</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(wrap);
    wrap.append(nameTpl.content, this.colorsEl);

    this.renderColors();

    this.colorsEl.addEventListener('click', (e) => {
      const active = <HTMLElement>(this.colorsEl).querySelector(`.${cls.active}`);
      const el = (<HTMLElement>e.target);
      const key = (<DOMStringMap>el.dataset).color;

      if (active) {
        if (active.dataset.color === key) {
          active.classList.remove(cls.active);

          Tree.filter.unsetGarland();
        } else {
          active.classList.remove(cls.active);
          el.classList.add(cls.active);

          Tree.filter.setGarland(key);
        }
      } else {
        el.classList.add(cls.active);

        Tree.filter.setGarland(key);
      }
    });
  }
}
