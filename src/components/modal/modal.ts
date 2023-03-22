import { Tags } from '@/types/enums';
import { Tag } from '@/common/tag';
import cls from './modal.module.scss';

class Modal {
  static modal = Tag.create(Tags.div, cls.modal);

  static register(root: Element) {
    root.after(this.modal);
  }

  static show(text: string) {
    this.modal.textContent = text;
    this.modal.classList.add(cls.modalOpen);

    setTimeout(() => {
      Modal.close();
    }, 1500);
  }

  static close() {
    this.modal.addEventListener('transitionend', () => {
      this.modal.textContent = '';
    });
    this.modal.classList.remove(cls.modalOpen);
  }
}

export default Modal;
