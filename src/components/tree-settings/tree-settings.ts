import Component from '@/common/component';
import EventEmitter from '@/common/event-emitter';
import Tag from '@/common/tag';
import Tree from '@/models/tree';
import { Tags } from '@/types/enums';
import cls from './tree-settings.module.scss';

export default class TreeSettings extends Component {
  private localroot = Tag.create(Tags.div, cls.settingsWrap);

  constructor(root: HTMLElement) {
    super(root);
    EventEmitter.subscribe('reset:filter', () => {
      // this.destroy();
      // this.root.innerHTML = '';
      // this.register();
    });
  }

  register() {
    const musicIcon = Tag.create(Tags.div, cls.player);

    this.localroot.append(musicIcon);
    this.root.append(this.localroot);

    musicIcon.onclick = (e) => {
      const el = <HTMLElement>(e.target);

      if (el.classList.contains(cls.active)) {
        el.classList.remove(cls.active);
      } else {
        el.classList.add(cls.active);
      }

      Tree.filter.togglePlayer();
    };
  }
}
