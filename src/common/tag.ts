class El {
  static create(el: string, classes?: string) {
    const element = document.createElement(el);

    if (classes) {
      element.className = classes;
    }

    // TODO: ?? should be refactored
    // 'T' could be instantiated with an arbitrary type which could be unrelated to 'HTMLElement'
    return element;
  }
}

export default El;
