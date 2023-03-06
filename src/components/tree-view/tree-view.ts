import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import { DEFAULT_TREE } from '@/common/game-constants';
import Tag from '@/common/tag';
import { ImagesStore } from '@/models/images-store';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import Garland from '../garland/garland';
import cls from './tree-view.module.scss';

export default class TreeView extends Component {
  private img: HTMLImageElement;

  constructor(root: HTMLElement) {
    super(root);




    const treeIndex = Number(Tree.filter.filter.tree);

    console.log('00000', treeIndex)
    this.img = ImagesStore.images.trees[treeIndex].cloneNode(true) as HTMLImageElement;

    EventEmitter.subscribe('change:tree', () => {
      console.log(this.root)
      this.img = ImagesStore.images.trees[Number(Tree.filter.filter.tree) - 1]
        .cloneNode(true) as HTMLImageElement;
      // super.clear();
      this.updateTree();
    });

    EventEmitter.subscribe('reset:tree-filter', () => {
      console.log(this.root)
      this.img = ImagesStore.images.trees[Number(Tree.filter.filter.tree)]
        .cloneNode(true) as HTMLImageElement;
      // super.clear();
      this.updateTree();
    });
  }

  updateTree() {
    console.log('updateTree', this.root);
    this.root.querySelector(`.${cls.img}`)?.replaceWith(this.img);
    this.img.useMap = '#image-map';
    this.img.classList.add(cls.img);

    const svg = Tag.create('div', cls.svgWrap);
    svg.innerHTML = `<svg viewBox="0 0 560 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="54,587,16,547,95,548,106,517,94,492,145,458,58,479,43,447,120,433,90,350,151,370,167,332,194,313,131,330,181,296,143,270,181,260,132,229,183,219,196,188,194,156,207,149,217,110,215,84,242,55,251,32,267,68,274,108,297,136,306,161,342,149,322,197,339,196,338,225,384,224,346,280,393,290,374,343,398,347,416,366,335,419,388,414,396,434,419,442,444,442,436,463,413,479,408,500,420,513,427,523,444,535,498,543,480,565,450,584,449,614,442,644,429,672,367,678,322,692,252,680,216,687,129,655,87,628" class="image-mapper-shape" data-area-index="0" style="fill: transparent; stroke: rgb(51, 51, 51); stroke-width: 2; opacity: 0.6; cursor: pointer;"></polygon>
    </svg>
    `;
  }

  register() {
    console.log('222', this.root)
    const garland = Tag.create(Tags.div, cls.garlandWrap);
    const garlandEl = new Garland(garland);
    garlandEl.register();

    this.root.classList.add(cls.localRoot);

    const treeNum = Tree.filter.filter.tree || DEFAULT_TREE;
    console.log('111', ImagesStore.images.trees);

    this.img = ImagesStore.images.trees[Number(treeNum) - 1];

    this.img.useMap = '#image-map';
    this.img.classList.add(cls.img);

    const svg = Tag.create('div', cls.svgWrap);
    svg.innerHTML = `<svg viewBox="0 0 560 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="54,587,16,547,95,548,106,517,94,492,145,458,58,479,43,447,120,433,90,350,151,370,167,332,194,313,131,330,181,296,143,270,181,260,132,229,183,219,196,188,194,156,207,149,217,110,215,84,242,55,251,32,267,68,274,108,297,136,306,161,342,149,322,197,339,196,338,225,384,224,346,280,393,290,374,343,398,347,416,366,335,419,388,414,396,434,419,442,444,442,436,463,413,479,408,500,420,513,427,523,444,535,498,543,480,565,450,584,449,614,442,644,429,672,367,678,322,692,252,680,216,687,129,655,87,628" class="image-mapper-shape" data-area-index="0" style="fill: transparent; stroke: rgb(51, 51, 51); stroke-width: 2; opacity: 0.6; cursor: pointer;"></polygon>
    </svg>
    `;
console.log('222', this.root)
    this.root.append(this.img, svg, garland);
  }
}
