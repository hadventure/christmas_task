import Component from '@/common/component';
import El from '@/common/tag';
import Toy from '@/models/toy';
import { Shapes, Tags } from '@/types/enums';
import cls from './search.module.scss';

class FilterSearch extends Component {
  private localroot = El.create(Tags.div, cls.searchGroup);

  register() {
    const name = `
      <div class=${cls.filterName}>поиск</div>
    `;

    this.root.innerHTML = name;

    this.localroot.innerHTML = `<div class=${cls.icon}></div>`;
    this.root.append(this.localroot);

    const input = El.create('input', cls.search, {
      type: 'search',
      autocomplete: 'off',
      placeholder: 'Поиск',
    });

    this.localroot.append(input);

    input.focus();
    input.addEventListener('input', (e) => {
      // TODO: once
      setTimeout(() => {
        const search = (<HTMLInputElement>e.target).value;

        Toy.filter.setSearch(search);
      }, 1500);
    });
  }
}

export default FilterSearch;
