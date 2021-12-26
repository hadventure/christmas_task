import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import { DEFAULT_TRANSFORMY } from '@/common/game-constants';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './garland.module.scss';

export default class Garland extends Component {
  private localRoot = Tag.create(Tags.div);

  private img = <HTMLImageElement>Tag.create(Tags.img, cls.img);

  private config = [
    { count: 3 },
    { count: 7 },
    { count: 9 },
    { count: 11 },
    { count: 13 },
  ];

  constructor(root: HTMLElement) {
    super(root);
  }

  register() {
    const gWrap = Tag.create(Tags.div, cls.gWrap);
    Object.values(this.config).forEach((el) => {
      const line = Tag.create(Tags.div, cls.gLine);

      const lights = new Array(el.count)
        .fill(true, 0)
        .map(() => Tag.create(Tags.div, cls.light));

      const middle = Math.floor(lights.length / 2);

      const map = lights.map((element, j, arr) => {
        const localEl = element;

        if (j < middle) {
          localEl.style.transform = `translateY(${DEFAULT_TRANSFORMY * (j + 1)}px)`;
          return localEl;
        }

        if (j > middle) {
          localEl.style.transform = `translateY(${DEFAULT_TRANSFORMY * Math.abs(arr.length - j)}px)`;
          return localEl;
        }

        if (j === middle) {
          localEl.style.transform = `translateY(${DEFAULT_TRANSFORMY * (middle) + 2}px)`;
          return localEl;
        }

        return localEl;
      });

      line.append(...map);
      gWrap.append(line);
    });

    this.root.append(gWrap);
  }
}
