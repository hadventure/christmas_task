import Component from '@/common/component';
import Tag from '@/common/tag';
import { Tags } from '@/types/enums';
import cls from './home-layout.module.scss';
import Header from '../../components/header/header';

export default class HomeLayout extends Component {
  private container = Tag.create(Tags.div, `${cls.toys} content`);

  register() {
    const btn = Tag.create(Tags.btn);
    btn.textContent = 'Begin';

    btn.onclick = () => {
      window.history.pushState({}, 'title', '#/toys');
      window.history.go();
    };

    this.container.append(btn)

    this.root.append(this.container);
  }
}
