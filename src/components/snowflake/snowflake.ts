import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Helper from '@/common/Helper';
import Tag from '@/common/tag';
import Toy from '@/models/toy';
import { Tags } from '@/types/enums';
import cls from './snowflake.module.scss';

export default class Snowflake extends Component {
  finish = false

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      // this.destroy();
      // this.root.innerHTML = '';
      // this.register();
    });
  }

  createSnow() {
    const snow = Tag.create(Tags.div, cls.snow)
    snow.style.left = `${Helper.getRndInteger(15, this.root.clientWidth - 15)}px`;
    this.root.append(snow);
    return snow;
  }

  register() {
    const time = Helper.getRndInteger(20, 1000);
    let snowflake = this.createSnow();
  
    let timerID = setTimeout(() => {
      if(!this.finish) this.register();
      let start = Date.now();
      let animationID: number;
      
      let end = false;
      const animate = () => {
        let timePassed = Date.now() - start;
        snowflake.style.transform = `translateY(${timePassed / 10}px)`
  
        // TODO
        let transformProp = window.getComputedStyle(snowflake).getPropertyValue("transform");
        let transformPropY = transformProp.split('(')[1].split(')')[0].split(',')[5];
        
        if(transformProp) {
          if(parseInt(transformPropY) > this.root.clientHeight) {
            end = true;
            clearTimeout(timerID);
            cancelAnimationFrame(animationID)
            snowflake.remove();
          };
        }
  
        if(end === true) {
          
          clearTimeout(timerID);
          cancelAnimationFrame(animationID);
        } else {
          animationID = requestAnimationFrame(animate);
        }
      }
  
      animationID = requestAnimationFrame(animate);

      if(end !== false) {
        cancelAnimationFrame(animationID);
      }
      
    }, time)


  }
}
