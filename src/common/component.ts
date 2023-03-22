export interface IComponent {
  register: () => void
}

class Component implements IComponent {
  protected root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  register() {
    this.register();
  }

  clear() {
    this.root.innerHTML = '';
  }
}

export { Component };
