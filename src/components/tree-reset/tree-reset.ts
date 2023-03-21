import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './tree-reset.module.scss';
import Tree from '@/models/tree';
import { lng } from '@/language/lng';

export default class TreeReset extends Component {
  register() {
    const btn = Tag.create(Tags.btn, `${app.btnDashed} ${cls.reset}`);
    btn.textContent = lng.clearTree;

    btn.onclick = () => {
      Tree.resetFilter();
    };

    this.root.append(btn);
  }
}
