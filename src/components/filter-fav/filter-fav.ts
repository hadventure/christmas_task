import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './filter-fav.module.scss';

class FilterFav extends Component {
  private input = <HTMLInputElement>Tag.create(Tags.input, cls.input, { type: 'checkbox' });

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      this.input.checked = false;
    });
  }

  register() {
    const name = `
      <div class=${cls.filterName}>любимые</div>
    `;

    const wrap = Tag.create(Tags.label, cls.container);

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.root.append(nameTpl.content, wrap);

    if (Toy.filter.filter.isFavourite) {
      this.input.checked = Toy.filter.filter.isFavourite;
    }

    const mark = Tag.create(Tags.span, cls.checkmark);

    wrap.append(this.input, mark);

    this.input.addEventListener('change', FilterFav.onChange);
  }

  static onChange() {
    Toy.filter.toggleFav();
  }
}

export default FilterFav;
