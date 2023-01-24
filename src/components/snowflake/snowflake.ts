import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Helper from '@/common/Helper';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './snowflake.module.scss';

export default class Snowflake extends Component {
  finish = false;

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('toggle:snow', () => {
      this.register();
    });
  }

  createSnow() {
    const snow = Tag.create(Tags.div, cls.snow);
    snow.style.left = `${Helper.getRndInteger(15, this.root.clientWidth - 15)}px`;
    this.root.append(snow);
    return snow;
  }

  register() {
    const snowflake = this.createSnow();
    const time = Helper.getRndInteger(20, 1000);

    const timerID = setTimeout(() => {
      if (Tree.filter.filter.snow) this.register();
      const start = Date.now();
      let animationID: number;

      let end = false;
      const animate = () => {
        const timePassed = Date.now() - start;
        snowflake.style.transform = `translateY(${timePassed / 10}px)`;

        // TODO
        const transformProp = window.getComputedStyle(snowflake).getPropertyValue('transform');
        const transformPropY = transformProp.split('(')[1].split(')')[0].split(',')[5];

        if (transformProp) {
          if (parseInt(transformPropY) > this.root.clientHeight) {
            end = true;
            clearTimeout(timerID);
            cancelAnimationFrame(animationID);
            snowflake.remove();
          }
        }

        if (end === true) {
          clearTimeout(timerID);
          cancelAnimationFrame(animationID);
        } else {
          animationID = requestAnimationFrame(animate);
        }
      };

      animationID = requestAnimationFrame(animate);

      if (!Tree.filter.filter.snow) {
        cancelAnimationFrame(animationID);
      }
    }, time);
  }
}
