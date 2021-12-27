import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import { DEFAULT_BG } from '@/common/game-constants';
import Tag from '@/common/tag';
import AsideToys from '@/components/aside-toys/aside-toys';
import FilterBg from '@/components/filter-bg/filter-bg';
import FilterGarland from '@/components/filter-garland/filter-garland';
import FilterTree from '@/components/filter-tree/filter-tree';
import Header from '@/components/header/header';
import TreeView from '@/components/tree-view/tree-view';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './tree-layout.module.scss';

class TreeLayout extends Component {
  private container = Tag.create(Tags.div, `${cls.treeLayout} content`);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:bg', () => {
      this.setBg(Tree.filter.filter.bg);
    });
  }

  setBg(num: string) {
    this.container.style.backgroundImage = `url("/src/assets/bg/${num}.jpg")`;
  }

  register() {
    const wrapHeader = Tag.create(Tags.div, cls.head);
    const header = new Header(wrapHeader);
    header.register();

    this.root.append(wrapHeader, this.container);

    this.setBg(DEFAULT_BG);

    const wrapAsideTree = Tag.create(Tags.div, `${cls.asideTree} col`);
    const wrapAsideToys = Tag.create(Tags.div, `${cls.asideToys} col`);
    const wrapTree = Tag.create(Tags.div, `${cls.tree} col`);

    this.container.append(
      wrapAsideTree,
      wrapTree,
      wrapAsideToys,
    );

    const filterTree = new FilterTree(wrapAsideTree);
    filterTree.register();

    const filterBg = new FilterBg(wrapAsideTree);
    filterBg.register();

    const filterFarland = new FilterGarland(wrapAsideTree);
    filterFarland.register();

    const asideToys = new AsideToys(wrapAsideToys);
    asideToys.register();

    const tree = new TreeView(wrapTree);
    tree.register();
  }
}

export default TreeLayout;
