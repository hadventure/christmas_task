import Component from '@/common/component';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './filter-bg.module.scss';
import EventEmitter from '@/common/event-emitter';

export default class FilterBg extends Component {
  private bgRoot = Tag.create(Tags.div, cls.bgRoot);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('reset:tree-filter', () => {
      this.bgRoot.innerHTML = '';
      this.renderTrees();
    });
  }

  renderTrees() {
    const bg = ['1', '2', '3', '4', '5', '6', '7', '10'];

    bg.forEach((num, i) => {
      const w = <HTMLDivElement>Tag.create(Tags.div, `${cls.bg}`);
      w.dataset.num = num;

      if (Tree.filter.filter.bg) {
        if (Tree.filter.filter.bg === num) {
          w.classList.add(cls.active);
        }
      } else if (i === 0) {
        w.classList.add(cls.active);
      }

      this.bgRoot.append(w);
    });
  }

  register() {
    const name = `
      <div class=${app.filterName}>Фон</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;
    wrap.append(nameTpl.content);
    this.root.append(wrap, this.bgRoot);

    this.renderTrees();

    this.bgRoot.addEventListener('click', (e) => {
      const active = this.bgRoot.querySelector(`.${cls.active}`);

      if (active) {
        active.classList.remove(cls.active);
      }

      const el = (<HTMLElement>e.target);
      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).num;
      Tree.filter.setBg(key);
    });
  }
}
