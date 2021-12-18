import Component from '@/common/component';
import El from '@/common/tag';
import Toy from '@/models/toy';
import { Shapes, Tags } from '@/types/enums';
import cls from './filter-shape.module.scss';

class FilterShape extends Component {
  register() {
    const name = `
      <div class=${cls.filterName}>форма</div>
    `;

    const wrap = El.create(Tags.div, cls.wrap);

    const colorsEl = El.create(Tags.div, cls.shapes);
    const nameTpl = document.createElement(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(wrap);
    wrap.append(nameTpl.content);
    wrap.append(colorsEl);

    const shapes = ['ball', 'bell', 'toy', 'pine', 'snowflake', 'star'];

    shapes.forEach((shape) => {
      const wrapShape = El.create(Tags.div, `${cls.wrapShape}`);

      const e = El.create('img', `${cls.img}`);
      e.src = `/src/assets/svg/shape/${shape}.svg`;
      e.dataset.color = shape;

      const e1 = El.create(Tags.div, `${cls.shapeName} ${cls[shape]}`);
      e1.textContent = Shapes[shape as keyof typeof Shapes];

      wrapShape.append(e);
      wrapShape.append(e1);

      colorsEl.append(wrapShape);
    });

    colorsEl.addEventListener('click', (e) => {
      const el = (<HTMLElement>e.target);

      if (el.classList.contains('img')) {
        el.classList.add(cls.active);
        const key = (<DOMStringMap>el.dataset).color;

        Toy.filter.setShapes(key);
      }
    });
  }
}

export default FilterShape;
