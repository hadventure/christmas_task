import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './filter-tree.module.scss';

export default class FilterTree extends Component {
  private treeRoot = Tag.create(Tags.div, cls.treeRoot);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('reset:tree-filter', () => {
      this.treeRoot.innerHTML = '';
      this.renderTrees();
    });
  }

  renderTrees() {
    const trees = ['1', '2', '4', '6'];

    trees.forEach((num, i) => {
      const el = <HTMLImageElement>Tag.create(Tags.img, `${cls.tree}`);
      el.src = `./src/assets/tree/${num}.png`;

      el.dataset.num = num;

      if (Tree.filter.filter.tree) {
        if (Tree.filter.filter.tree === num) {
          el.classList.add(cls.active);
        }
      } else if (i === 0) {
        el.classList.add(cls.active);
      }

      this.treeRoot.append(el);
    });
  }

  register() {
    const name = `
      <div class=${cls.filterName}>Елка</div>
    `;

    const wrap = Tag.create(Tags.div, cls.wrap);
    const nameTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    nameTpl.innerHTML = name;
    wrap.append(nameTpl.content);
    this.root.append(wrap, this.treeRoot);

    this.renderTrees();

    this.treeRoot.addEventListener('click', (e) => {
      const active = this.treeRoot.querySelector(`.${cls.active}`);

      if (active) {
        active.classList.remove(cls.active);
      }
      const el = (<HTMLElement>e.target);
      el.classList.add(cls.active);
      const key = (<DOMStringMap>el.dataset).num;
      Tree.filter.setTree(key);
    });
  }
}
