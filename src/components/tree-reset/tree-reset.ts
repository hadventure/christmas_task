import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './tree-reset.module.scss';
import Tree from '@/models/tree';

export default class TreeReset extends Component {
  register() {
    const btn = Tag.create(Tags.btn, `${app.btnDashed} ${cls.reset}`);
    btn.textContent = 'Очистить настройки ели';

    btn.onclick = () => {
      Tree.resetFilter();
    };

    this.root.append(btn);
  }
}
