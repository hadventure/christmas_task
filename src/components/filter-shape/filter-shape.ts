import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Shapes, Tags } from '@/types/enums';
import cls from './filter-shape.module.scss';

class FilterShape extends Component {
  private shapesEl = Tag.create(Tags.div, cls.shapes);

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      this.shapesEl.innerHTML = '';
      this.renderShapes();
    });
  }

  renderShapes() {
    const shapes = ['ball', 'bell', 'toy', 'pine', 'snowflake', 'star'];

    shapes.forEach((shape) => {
      const wrapShape = Tag.create(Tags.div, `${cls.wrapShape}`);

      const e = <HTMLImageElement>Tag.create(Tags.img, `${cls.img}`);
      e.src = `/src/assets/svg/shape/${shape}.svg`;
      e.dataset.shape = shape;

      if (Toy.filter.filter.shapes[shape]) {
        e.classList.add(cls.active);
      }

      const e1 = Tag.create(Tags.div, `${cls.shapeName} ${cls[shape]}`);
      e1.textContent = Shapes[shape as keyof typeof Shapes];

      wrapShape.append(e, e1);

      this.shapesEl.append(wrapShape);
    });
  }

  register() {
    const name = `
      <div class=${cls.filterName}>форма</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(wrap);
    wrap.append(nameTpl.content, this.shapesEl);

    this.renderShapes();

    this.shapesEl.addEventListener('click', (e) => {
      const el = (<HTMLElement>e.target);

      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).shape;

      Toy.filter.setShapes(key);
    });
  }
}

export default FilterShape;
