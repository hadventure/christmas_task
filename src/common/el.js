class El {
  static tags = {
    div: 'div',
    img: 'img',
    btn: 'button',
  };

  static create(el, classes, config) {
    const element = document.createElement(el);

    if (classes) {
      element.classList = classes;
    }

    if (config) {
      Object.keys(config).forEach((key) => {
        element[key] = config[key];
      });
    }

    return element;
  }
}

export default El;
