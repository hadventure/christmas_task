import { Component } from '@/common/component';
import { EventEmitter } from '@/common/event-emitter';
import { Tag } from '@/common/tag';
import { lng } from '@/language/lng';
import { Toy } from '@/models/toy';
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
    this.createOption(`${lng.sortName} ${lng.asc}`, 'name-asc');
    this.createOption(`${lng.sortName} ${lng.desc}`, 'name-desc');
    this.createOption(`${lng.sortYear} ${lng.asc}`, 'year-asc');
    this.createOption(`${lng.sortYear} ${lng.desc}`, 'year-desc');
  }

  register() {
    const nameF = `
      <div class=${cls.filterName}>${lng.sorting}</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = nameF;
    this.renderSelect();

    this.root.append(nameTpl.content, this.sel);

    this.sel.addEventListener('change', (e) => {
      const optionValue = (<HTMLSelectElement>e.target).value;

      Toy.filter.setSorter(optionValue);
    });
  }
}

export { Sorter };
