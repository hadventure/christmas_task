import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './sorter.module.scss';

class Sorter extends Component {
  private sel = <HTMLSelectElement>Tag.create(Tags.select, cls.select);

  private val!: string;

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('reset:storage', () => {
      this.clearSelect();
      this.renderSelect();
      Toy.sortList();
    });

    // EventEmitter.subscribe('reset:filter', () => {
    //   Toy.sortList();
    // });
  }

  createOption = (title: string, value: string) => {
    const opt = <HTMLOptionElement>Tag.create(Tags.option);
    opt.textContent = title;
    opt.value = value;

    opt.selected = value === this.val;

    this.sel.append(opt);
  };

  clearSelect() {
    this.sel.innerHTML = '';
  }

  renderSelect() {
    const { name, direction } = Toy.filter.sorter;
    this.val = `${name}-${direction}`;

    this.createOption('', '');
    this.createOption('Наименование - по возрастанию', 'name-asc');
    this.createOption('Наименование - по убыванию', 'name-desc');
    this.createOption('Год - по возрастанию', 'year-asc');
    this.createOption('Год - по убыванию', 'year-desc');
  }

  register() {
    const nameF = `
      <div class=${cls.filterName}>сортировка</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = nameF;
    this.renderSelect();

    this.root.append(nameTpl.content, this.sel);

    this.sel.addEventListener('change', (e) => {
      const value1 = (<HTMLSelectElement>e.target).value;

      Toy.filter.setSorter(value1);
    });
  }
}

export default Sorter;
