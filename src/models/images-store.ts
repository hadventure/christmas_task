export default class ImagesStore {
  public static async loadImages() {
    await ImagesStore.loadHomeBackground();
    await ImagesStore.loadToysImages();
    await ImagesStore.loadBackgroundImages();
    await ImagesStore.loadTreesImages();
  }

  public static async loadHomeBackground() {
    const promises = [];

    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = './src/assets/bg/home.png';
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
    promises.push(promise);

    await Promise.all(promises);
  }

  public static async loadToysImages() {
    const promises = [];

    for (let i = 1; i <= 60; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/toys/${i}.png`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    await Promise.all(promises);
  }

  public static async loadBackgroundImages() {
    const promises = [];

    for (let i = 1; i <= 10; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/bg/${i}.jpg`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    await Promise.all(promises);
  }

  public static async loadTreesImages() {
    const promises = [];

    for (let i = 1; i <= 6; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/tree/${i}.png`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    await Promise.all(promises);
  }
}
