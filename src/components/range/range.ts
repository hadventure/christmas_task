import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
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

  private name: string;

  private rootValFrom = Tag.create(Tags.div, cls.rangeVal);

  private rootValTo = Tag.create(Tags.div, cls.rangeVal);

  private fromEl = <HTMLInputElement>Tag.create(Tags.input, `${cls.range} ${cls.rangeFrom}`);

  private toEl = <HTMLInputElement>Tag.create(Tags.input, `${cls.range} ${cls.rangeTo}`);

  constructor(root: HTMLElement, from: string, to: string, type: string, name: string) {
    super(root);

    this.min = from;
    this.max = to;

    this.from = from;
    this.to = to;

    this.type = type;
    this.name = name;

    this.fromEl.type = 'range';
    this.fromEl.min = this.min;
    this.fromEl.step = '1';
    this.fromEl.max = this.max;
    this.fromEl.value = '0';

    this.toEl.type = 'range';
    this.toEl.min = this.min;
    this.toEl.step = '1';
    this.toEl.max = this.max;
    this.toEl.value = this.max;

    this.root.classList.add(cls.rootRange);

    EventEmitter.subscribe('reset:filter', () => {
      this.from = this.min;
      this.to = this.max;
      this.renderVal();
      this.resetColor();
    });
  }

  resetColor() {
    this.fromEl.value = this.min;
    this.toEl.value = this.max;
    this.toEl.style.background = `linear-gradient(to right, #FDD700 ${0}%, #FDD700 100%`;
  }

  renderVal() {
    let min = `<div class=${cls.from}>${this.from}</div>`;
    let max = `<div class=${cls.to}>${this.to}</div>`;

    if (this.type === 'yearRange') {
      if (Toy.filter.filter[this.type].years.length) {
        const [valfrom, valto] = Toy.filter.filter[this.type].years;

        this.fromEl.value = valfrom;
        this.toEl.value = valto;

        min = `<div class=${cls.from}>${valfrom}</div>`;
        max = `<div class=${cls.to}>${valto}</div>`;

        const [f, t] = Toy.filter.filter[this.type].percent;

        this.toEl.style.background = `linear-gradient(to right, #eee ${f}%, #FDD700 ${f}% ${t}%, #eee ${t}% 100%`;
      }
    }

    if (this.type === 'qtyRange') {
      if (Toy.filter.filter[this.type].years.length) {
        const [valfrom, valto] = Toy.filter.filter[this.type].years;

        this.fromEl.value = valfrom;
        this.toEl.value = valto;

        min = `<div class=${cls.from}>${valfrom}</div>`;
        max = `<div class=${cls.to}>${valto}</div>`;

        const [f, t] = Toy.filter.filter[this.type].percent;

        this.toEl.style.background = `linear-gradient(to right, #eee ${f}%, #FDD700 ${f}% ${t}%, #eee ${t}% 100%`;
      }
    }

    this.rootValFrom.innerHTML = min;
    this.rootValTo.innerHTML = max;
  }

  register() {
    const name = `
      <div class=${cls.filterName}>${this.name}</div>
    `;

    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;

    this.renderVal();

    const wrapRange = Tag.create(Tags.div, cls.rangeWrap);
    const container = Tag.create(Tags.div, cls.container);

    this.root.append(nameTpl.content, wrapRange);
    wrapRange.append(this.rootValFrom, container, this.rootValTo);

    container.append(this.fromEl, this.toEl);

    this.fromEl.addEventListener('input', () => {
      if (+this.fromEl.value > +this.toEl.value) {
        this.toEl.value = this.fromEl.value;
      }
    });

    this.toEl.addEventListener('input', () => {
      if (+this.toEl.value < +this.fromEl.value) {
        this.fromEl.value = this.toEl.value;
      }
    });

    container.querySelectorAll(`.${cls.range}`).forEach((slider) => {
      slider.addEventListener('change', () => {
        this.from = this.fromEl.value;
        this.to = this.toEl.value;

        const dif = +this.fromEl.max - +this.fromEl.min;

        const b = ((+this.fromEl.max - +this.to) * 100) / dif;
        const end = ((+this.fromEl.max - +this.from) * 100) / dif;

        const f = 100 - end;
        const t = 100 - b;
        this.toEl.style.background = `linear-gradient(to right, #eee ${f}%, #FDD700 ${f}% ${t}%, #eee ${t}% 100%`;

        Toy.filter.setPercent(this.type, `${100 - end}`, `${100 - b}`);
        Toy.filter.setValues(this.type, this.fromEl.value, this.toEl.value);
        this.renderVal();
      });
    });
  }
}

export default Range;
