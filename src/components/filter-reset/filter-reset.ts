import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Shapes, Tags } from '@/types/enums';
import cls from './filter-reset.module.scss';

class FilterReset extends Component {
  register() {
    console.log('-------')
    // const name = `
    //   <div class=${cls.filterName}>форма</div>
    // `;

    const btn = Tag.create(Tags.btn, cls.reset);
    btn.textContent = 'Очистить фильтры';

    this.root.append(btn);
    // const colorsEl = Tag.create(Tags.div, cls.shapes);
    // const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    // nameTpl.innerHTML = name;

    // this.root.append(wrap);
    // wrap.append(nameTpl.content, colorsEl);

    // const shapes = ['ball', 'bell', 'toy', 'pine', 'snowflake', 'star'];

    // shapes.forEach((shape) => {
    //   const wrapShape = Tag.create(Tags.div, `${cls.wrapShape}`);

    //   const e = <HTMLImageElement>Tag.create(Tags.img, `${cls.img}`);
    //   e.src = `/src/assets/svg/shape/${shape}.svg`;
    //   e.dataset.color = shape;

    //   const e1 = Tag.create(Tags.div, `${cls.shapeName} ${cls[shape]}`);
    //   e1.textContent = Shapes[shape as keyof typeof Shapes];

    //   wrapShape.append(e, e1);

    //   colorsEl.append(wrapShape);
    // });

    // colorsEl.addEventListener('click', (e) => {
    //   const el = (<HTMLElement>e.target);

    //   el.classList.add(cls.active);
    //   const key = (<DOMStringMap>el.dataset).color;

    //   Toy.filter.setShapes(key);
    // });
  }
}

export default FilterReset;
