class LS {
  static ls = {
    user: '',
    answPictures: {},
    answPainters: {},
    quizPaintings: {},
    quizPainters: {},
    settings: {
      timer: false,
      timerValue: '10',
      volume: false,
      volumeValue: '0',
    },
  };

  static initLocalStorage() {
    if (localStorage.getItem('app') === null) {
      localStorage.setItem('app', JSON.stringify(this.ls));
    } else {
      this.ls = JSON.parse(localStorage.getItem('app'));
    }
  }

  static setLocalStorage() {
    localStorage.setItem('app', JSON.stringify(this.ls));
  }

  static getLocalStorage() {
    this.ls = JSON.parse(localStorage.getItem('app'));
  }

  static setResults(category, count) {
    this.getLocalStorage();

    this.ls.quizPaintings[category] = String(count);
    this.setLocalStorage();
  }

  static setResultsPainters(category, count) {
    this.getLocalStorage();

    this.ls.quizPainters[category] = String(count);
    this.setLocalStorage();
  }

  static setSetting(item, value) {
    this.getLocalStorage();

    this.ls.settings[item] = value;
    this.setLocalStorage();
  }

  static setAnswersPictures(category, store) {
    this.ls.answPictures[category] = store;
    this.setLocalStorage();
  }

  static setAnswersPainters(category, store) {
    this.ls.answPainters[category] = store;
    this.setLocalStorage();
  }

  static setUser(login) {
    this.ls.user = login;
    this.setLocalStorage();
  }
}

export default LS;
