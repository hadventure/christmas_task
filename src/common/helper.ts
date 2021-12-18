class Helper {
  static getChunks(arr, size) {
    return arr.reduce((p, c) => {
      if (p[p.length - 1].length === size) {
        p.push([]);
      }

      p[p.length - 1].push(c);
      return p;
    }, [[]]);
  }

  static getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static shuffle(array) {
    const copy = array;

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [array[j], array[i]];
    }

    return array;
  }
}

export default Helper;
