import Component from '@/common/component';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './range.module.scss';

class Range extends Component {
  private from!: string;

  private to!: string;

  private min: string;

  private max: string;

  private type: string;

  constructor(root: HTMLElement, from: string, to: string, type: string) {
    super(root);

    this.min = from;
    this.max = to;

    this.type = type;
  }

  register() {
    const name = `
      <div class=${cls.filterName}>Количество</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    const min = `<div class=${cls.from}>55</div>`;
    const max = `<div class=${cls.to}>55</div>`;

    const fromTpl = <HTMLTemplateElement>Tag.create(Tags.tpl, cls.from);
    const toTpl = <HTMLTemplateElement>Tag.create(Tags.tpl, cls.to);
    fromTpl.innerHTML = min;
    toTpl.innerHTML = max;

    const wrapRange = Tag.create(Tags.div, cls.rangeWrap);
    const container = Tag.create(Tags.div, cls.container);

    this.root.append(nameTpl.content, wrapRange);
    wrapRange.append(fromTpl.content, container, toTpl.content);

    const from = <HTMLInputElement>Tag.create(Tags.input, `${cls.range} ${cls.rangeFrom}`);
    from.type = 'range';
    from.min = this.min;
    from.step = '1';
    from.max = this.max;
    from.value = '0';

    const to = <HTMLInputElement>Tag.create(Tags.input, `${cls.range} ${cls.rangeTo}`);
    to.type = 'range';
    to.min = this.min;
    to.step = '1';
    to.max = this.max;
    to.value = this.max;

    container.append(from, to);

    from.addEventListener('input', () => {
      if (+from.value > +to.value) {
        to.value = from.value;
      }
    });

    to.addEventListener('input', () => {
      if (+to.value < +from.value) {
        from.value = to.value;
      }
    });

    container.querySelectorAll(`.${cls.range}`).forEach((slider) => {
      slider.addEventListener('change', () => {
        this.from = from.value;
        this.to = to.value;

        const dif = +from.max - +from.min;

        const b = ((+from.max - +this.to) * 100) / dif;
        const end = ((+from.max - +this.from) * 100) / dif;

        // TODO: calculations are messed up && delagation
        const f = 100 - end;
        const t = 100 - b;
        to.style.background = `linear-gradient(to right, #eee ${f}%, #FDD700 ${f}% ${t}%, #eee ${t}% 100%`;
        console.log(`from ${100 - end} to ${100 - b}`);

        Toy.filter.setPercent(this.type, `${100 - end}`, `${100 - b}`);
        Toy.filter.setValues(this.type, from.value, to.value);
      });
    });
  }
}

export default Range;
