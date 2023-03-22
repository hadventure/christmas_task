import { Component } from '@/common/component';
import { Tag } from '@/common/tag';
import { Toy } from '@/models/toy';
import { Tags } from '@/types/enums';
import cls1 from './filter-size.module.scss';
import cls from '../filter-fav/filter-fav.module.scss';
import { EventEmitter } from '@/common/event-emitter';

class FilterSize extends Component {
  private localRoot = Tag.create(Tags.div, cls1.root);

  private inputS = <HTMLInputElement>Tag.create(Tags.input, cls.input);

  private inputM = <HTMLInputElement>Tag.create(Tags.input, cls.input);

  private inputL = <HTMLInputElement>Tag.create(Tags.input, cls.input);

  createControl(size: string, input: HTMLInputElement) {
    const lInput = input;
    lInput.type = 'checkbox';
    const itemRoot = Tag.create(Tags.div, cls1.item);

    const name = Tag.create(Tags.div, cls.filterName);
    name.textContent = size;
    const wrap = Tag.create(Tags.label, `${cls.container} ${cls1.item}`);

    itemRoot.append(name, wrap);
    this.localRoot.append(itemRoot);

    const mark = Tag.create(Tags.span, cls.checkmark);
    wrap.append(input, mark);

    lInput.dataset.size = size;

    if (Toy.filter.filter.sizes[size]) {
      lInput.checked = Toy.filter.filter.sizes[size];
    }

    EventEmitter.subscribe('reset:filter', () => {
      lInput.checked = false;
    });

    input.addEventListener('change', (e) => {
      const el = (<HTMLElement>e.target);
      const key = (<DOMStringMap>el.dataset).size;
      Toy.filter.setSize(key);
    });
  }

  register() {
    this.root.append(this.localRoot);
    this.createControl('S', this.inputS);
    this.createControl('M', this.inputM);
    this.createControl('L', this.inputL);
  }

  static onChange() {
    Toy.filter.toggleFav();
  }
}

export default FilterSize;
