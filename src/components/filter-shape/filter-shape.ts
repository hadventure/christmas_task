import Component from '@/common/component';
import El from '@/common/tag';
import Toy from '@/models/toy';
import { Shapes, Tags } from '@/types/enums';
import cls from './filter-shape.module.scss';

class FilterShape extends Component {
  constructor(root: HTMLElement) {
    super(root);

    console.log(Toy.filter);
  }

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
      e1.textContent = Shapes[shape];

      wrapShape.append(e);
      wrapShape.append(e1);

      colorsEl.append(wrapShape);
    });

    colorsEl.addEventListener('click', (e) => {
      console.log(e.target, e.currentTarget);
      e.target.classList.add(cls.active);
      Toy.filter.setShapes(e.target.dataset.color);
    });
  }
}

export default FilterShape;
