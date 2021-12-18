class LS {
  static ls: { fav: string[] } = {
    fav: [],
  };

  static initLocalStorage() {
    if (localStorage.getItem('app') === null) {
      localStorage.setItem('app', JSON.stringify(this.ls));
    } else {
      LS.ls = JSON.parse(localStorage.getItem('app'));
    }
  }

  static setLocalStorage() {
    localStorage.setItem('app', JSON.stringify(this.ls));
  }

  static getLocalStorage() {
    LS.ls = JSON.parse(localStorage.getItem('app'));
  }

  static setFavourite(fav: string[]) {
    LS.getLocalStorage();

    LS.ls.fav = fav;
    LS.setLocalStorage();
  }
}

export default LS;
