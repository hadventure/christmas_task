class El {
  static create(el: string, classes?: string) {
    const element = <HTMLElement>document.createElement(el);

    if (classes) {
      element.className = classes;
    }

    // if (config) {
    //   Object.keys(config).forEach((key) => {
    //     element[key] = config[key];
    //   });
    // }

    return element;
  }
}

export default El;
