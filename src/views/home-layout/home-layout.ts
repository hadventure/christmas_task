import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './home-layout.module.scss';

export default class HomeLayout extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} content`);

  register() {
    const btn = Tag.create(Tags.btn, `${app.btnPrimary} ${cls.greeting}`);
    btn.textContent = 'Помоги бабушке нарядить елку';

    btn.onclick = () => {
      window.history.pushState({}, 'title', '#/toys');
      window.history.go();
    };

    this.container.append(btn);

    this.root.append(this.container);
  }
}
