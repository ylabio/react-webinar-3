class StateManager {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  getState() {
    return this.state;
  }
}

export { StateManager };
