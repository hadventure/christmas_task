import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import { DEFAULT_TRANSFORMY } from '@/common/game-constants';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Garlands, GarlandsReversed, Tags } from '@/types/enums';
import cls from './garland.module.scss';

export default class Garland extends Component {
  private config = [
    { count: 3 },
    { count: 7 },
    { count: 9 },
    { count: 11 },
    { count: 13 },
  ];

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:garland', () => {
      this.updateLights();
    });

    EventEmitter.subscribe('reset:tree-filter', () => {
      // TODO: not update at all (hide?)
      this.updateLights();
    });
  }

  updateLights() {
    // TODO: how to update only color
    this.root.innerHTML = '';
    this.register();
  }

  static figureGarland(index: number) {
    let classes = cls.light;

    if (Tree.filter.filter.garland === Garlands.multi) {
      if (index === 0) {
        classes += ` ${cls.yellow}`;
      }

      if (index === 1) {
        classes += ` ${cls.aqua}`;
      }

      if (index === 2) {
        classes += ` ${cls.pink}`;
      }

      if (index === 3) {
        classes += ` ${cls.green}`;
      }
    } else {
      const main = GarlandsReversed[Tree.filter.filter.garland as keyof typeof GarlandsReversed];
      classes += ` ${cls[main]}`;
    }

    return classes;
  }

  register() {
    const gWrap = Tag.create(Tags.div, cls.gWrap);
    Object.values(this.config).forEach((el) => {
      const line = Tag.create(Tags.div, cls.gLine);

      const temp = [];
      const lights = new Array(el.count)
        .fill(true, 0)
        .map(() => {
          if (temp.length === 3) {
            temp.length = 0;
          } else {
            temp.push(1);
          }

          return Tag.create(Tags.div, `${Garland.figureGarland(temp.length)}`);
        });

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
