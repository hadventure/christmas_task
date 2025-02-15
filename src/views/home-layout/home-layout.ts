import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import app from '@/app.module.scss';
import cls from './home-layout.module.scss';
import Router from '@/common/router';

export default class HomeLayout extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} content`);

  register() {
    const btn = Tag.create(Tags.btn, `${app.btnPrimary} ${cls.greeting}`);
    btn.textContent = 'Помогите бабушке нарядить елку';

    btn.onclick = () => {
      window.history.replaceState({ path: '#/toys' }, 'title', '#/toys');
      // window.history.go();
      Router.initView();
    };

    this.container.append(btn);

    this.root.append(this.container);
  }
}
