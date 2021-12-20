import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './search.module.scss';

class FilterSearch extends Component {
  private localroot = Tag.create(Tags.div, cls.searchGroup);

  private input = <HTMLInputElement>Tag.create('input', cls.search);

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      this.destroy();
      this.root.innerHTML = '';
      this.register();
    });
  }

  destroy() {
    this.input.removeEventListener('input', FilterSearch.onInput);
  }

  register() {
    const name = `
      <div class=${cls.filterName}>поиск</div>
    `;

    this.root.innerHTML = name;

    this.localroot.innerHTML = `<div class=${cls.icon}></div>`;
    this.root.append(this.localroot);

    this.input.type = 'search';
    this.input.autocomplete = 'off';
    this.input.placeholder = 'Поиск';
    this.input.value = Toy.filter.filter.search;
    this.input.autofocus = true;


    this.localroot.append(this.input);

    // this.input.focus();
    this.input.addEventListener('input', (e) => FilterSearch.onInput(e));
  }

  static onInput(e: Event) {
    // TODO: once
    setTimeout(() => {
      const search = (<HTMLInputElement>e.target).value;
      Toy.filter.setSearch(search);
    }, 1500);
  }
}

export default FilterSearch;
