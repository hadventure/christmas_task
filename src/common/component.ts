interface IComponent {
  register: () => void
}

class Component {
  protected root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }
}

export default Component;
