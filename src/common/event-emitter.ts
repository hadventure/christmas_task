// TODO: add remove listner
// https://stackoverflow.com/questions/12734660/a-typed-array-of-functions

type TEvents = {
  [index: string]: { (): void; } []
};

class EventEmitter {
  static events: TEvents = {};

  static subscribe(eventName: string, fn: () => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
    };
  }

  static emit(eventName: string) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null);
      });
    }
  }
}

export default EventEmitter;
