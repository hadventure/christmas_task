import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './sorter.module.scss';

class Sorter extends Component {
  register() {
    const name = `
      <div class=${cls.filterName}>сортировка</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    const sel = Tag.create(Tags.select, cls.select);

    const options = `
      <option></option>
      <option value="name-asc">Наименование - по возрастанию</option>
      <option value="name-desc">Наименование - по убыванию</option>
      <option value="year-asc">Год - по возрастанию</option>
      <option value="year-desc">Год - по убыванию</option>
    `;

    sel.innerHTML = options;

    this.root.append(nameTpl.content, sel);

    sel.addEventListener('change', (e) => {
      const val = (<HTMLSelectElement>e.target).value;

      Toy.filter.setSorter(val);
    });
  }
}

export default Sorter;
