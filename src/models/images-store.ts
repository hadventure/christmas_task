interface IImagesStore {
  toys: HTMLImageElement[],
  backgrounds: HTMLImageElement[],
  trees: HTMLImageElement[],
}

export class ImagesStore {
  static images: IImagesStore = {
    toys: [],
    backgrounds: [],
    trees: [],
  };

  public async loadImages() {
    await this.loadToysImages();
    await this.loadBackgroundImages();
    await this.loadTreesImages();
  }

  public async loadToysImages() {
    const promises = [];

    for (let i = 1; i <= 60; i++) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/toys/${i}.png`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    const data = await Promise.all(promises);
    console.log('2');
    ImagesStore.images.toys = data as HTMLImageElement[];
  }

  public async loadBackgroundImages() {
    const promises = [];

    for (let i = 1; i <= 10; i++) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/bg/${i}.jpg`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    const data = await Promise.all(promises);
    ImagesStore.images.backgrounds = data as HTMLImageElement[];
  }

  public async loadTreesImages() {
    const promises = [];

    for (let i = 1; i <= 6; i++) {
      const promise = new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `./src/assets/tree/${i}.png`;
        image.onload = () => resolve(image);
        image.onerror = reject;
      });
      promises.push(promise);
    }

    const data = await Promise.all(promises);
    ImagesStore.images.trees = data as HTMLImageElement[];
  }
}
