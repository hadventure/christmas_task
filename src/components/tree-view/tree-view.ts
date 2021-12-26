import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import Garland from '../garland/garland';
import cls from './tree-view.module.scss';

export default class TreeView extends Component {
  private localRoot = Tag.create(Tags.div);

  private img = <HTMLImageElement>Tag.create(Tags.img, cls.img);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:tree', () => {
      this.img.src = `/src/assets/tree/${Tree.filter.filter.tree}.png`
    });

    // EventEmitter.subscribe('reset:filter', () => {
    //   Toy.sortList();
    // });
  }

  register() {
    console.log(this);
    const garland = Tag.create(Tags.div, cls.garlandWrap);
    const garlandEl = new Garland(garland);
    garlandEl.register();

    this.root.classList.add(cls.localRoot);

    const m = <HTMLMapElement>Tag.create('map');
    m.name = 'image-map';

    const area = <HTMLAreaElement>Tag.create('area');
    area.coords = '31,609,12,537,45,497,18,437,104,422,105,388,71,363,108,319,127,253,99,211,141,213,176,165,152,130,195,119,200,73,223,40,247,0,273,32,315,76,279,121,309,116,314,157,346,130,361,144,343,177,352,200,364,215,397,216,402,241,395,273,394,302,375,322,387,345,428,348,426,369,377,403,399,404,408,418,415,433,449,442,459,463,427,484,435,511,439,527,487,529,493,553,489,565,463,580,467,601,459,633,448,648,444,669,406,673,379,695,327,701,255,697,206,700,137,689,107,684';
    area.shape = 'poly';

    // const
    this.img.src = '/src/assets/tree/1.png';
    this.img.useMap = '#image-map';

    m.append(area);

    this.root.append(this.img, m, garland);
  }
}
