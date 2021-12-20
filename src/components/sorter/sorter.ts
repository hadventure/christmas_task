import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './sorter.module.scss';

class Sorter extends Component {
  register() {
    const nameF = `
      <div class=${cls.filterName}>сортировка</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = nameF;

    const sel = <HTMLSelectElement>Tag.create(Tags.select, cls.select);

    console.log(Toy.filter.sorter);
    // if (Object.keys(Toy.filter.sorter).length) {
    const { name, direction } = Toy.filter.sorter;
    const val = `${name}-${direction}`;
    // }

    const createOption = (title: string, value: string) => {
      const opt = <HTMLOptionElement>Tag.create(Tags.option);
      opt.textContent = title;
      opt.value = value;

      opt.selected = value === val;

      sel.append(opt);
    };

    createOption('', '');
    createOption('Наименование - по возрастанию', 'name-asc');
    createOption('Наименование - по убыванию', 'name-desc');
    createOption('Год - по возрастанию', 'year-asc');
    createOption('Год - по убыванию', 'year-desc');

    this.root.append(nameTpl.content, sel);

    sel.addEventListener('change', (e) => {
      const value1 = (<HTMLSelectElement>e.target).value;

      Toy.filter.setSorter(value1);
    });
  }
}

export default Sorter;
