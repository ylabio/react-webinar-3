class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.maxCode = Math.max(...initState.list.map(item => item.code), 0);
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  addItem() {
    this.maxCode += 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.maxCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  selectItem(code, event) {
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const wasSelected = item.selected;
          item.selected = !item.selected;
          if (!wasSelected) {
            item.selectionCount = (item.selectionCount || 0) + 1;
          }
        } else if (!isCtrlPressed) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;