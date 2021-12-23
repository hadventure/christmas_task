// <!-- Image Map Generated by http://www.image-map.net/ -->
// <img src="1.png" usemap="#image-map">

// <map name="image-map">
//     <area target="" alt="" title="" href="" coords="31,609,12,537,45,497,18,437,104,422,105,388,71,363,108,319,127,253,99,211,141,213,176,165,152,130,195,119,200,73,223,40,247,0,273,32,315,76,279,121,309,116,314,157,346,130,361,144,343,177,352,200,364,215,397,216,402,241,395,273,394,302,375,322,387,345,428,348,426,369,377,403,399,404,408,418,415,433,449,442,459,463,427,484,435,511,439,527,487,529,493,553,489,565,463,580,467,601,459,633,448,648,444,669,406,673,379,695,327,701,255,697,206,700,137,689,107,684" shape="poly">
// </map>

import Component from '@/common/component';
import { favQuantity } from '@/common/game-constants';
import LS from '@/common/local-storage';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './tree.module.scss';

class Tree extends Component {
  private localRoot = Tag.create(Tags.div);

  register() {
    console.log(this);

    this.root.classList.add(cls.localRoot)

    const m = <HTMLMapElement>Tag.create('map');
    m.name = 'image-map';

    const area = <HTMLAreaElement>Tag.create('area');
    area.coords = '31,609,12,537,45,497,18,437,104,422,105,388,71,363,108,319,127,253,99,211,141,213,176,165,152,130,195,119,200,73,223,40,247,0,273,32,315,76,279,121,309,116,314,157,346,130,361,144,343,177,352,200,364,215,397,216,402,241,395,273,394,302,375,322,387,345,428,348,426,369,377,403,399,404,408,418,415,433,449,442,459,463,427,484,435,511,439,527,487,529,493,553,489,565,463,580,467,601,459,633,448,648,444,669,406,673,379,695,327,701,255,697,206,700,137,689,107,684';
    area.shape = 'poly';

    const img = <HTMLImageElement>Tag.create(Tags.img, cls.img);
    img.src = '/src/assets/tree/1.png';
    img.useMap = '#image-map';

    m.append(area);

    this.root.append(img, m);
  }
}

export default Tree;
