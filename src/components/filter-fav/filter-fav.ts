import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './filter-fav.module.scss';

class FilterFav extends Component {
  register() {
    const name = `
      <div class=${cls.filterName}>любимые</div>
    `;

    const wrap = Tag.create(Tags.label, cls.container);

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(nameTpl.content, wrap);

    const input = Tag.create(Tags.input, cls.input, { type: 'checkbox' });
    const mark = Tag.create(Tags.span, cls.checkmark);

    wrap.append(input, mark);

    input.addEventListener('change', (e) => {
      console.log(e);

      Toy.filter.toggleFav();

      // const el = (<HTMLElement>e.target);
      // el.classList.add(cls.active);
      // const key = (<DOMStringMap>el.dataset).color;
      // Toy.filter.setColors(key);
    });
  }
}

export default FilterFav;
