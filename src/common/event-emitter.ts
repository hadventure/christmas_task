class EventEmitter {
  static events = {};

  static subscribe(eventName: any, fn: any) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
    };
  }

  static emit(eventName: any, data: any) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: any) => {
        fn.call(null, data);
      });
    }
  }
}

export default EventEmitter;
