class El {
  static create(el: string, classes?: string, config?: any) {
    const element = document.createElement(el);

    if (classes) {
      element.className = classes;
    }

    if (config) {
      Object.keys(config).forEach((key) => {
        element[key] = config[key];
      });
    }

    // TODO: ?? should be refactored
    // 'T' could be instantiated with an arbitrary type which could be unrelated to 'HTMLElement'
    return element;
  }
}

export default El;
