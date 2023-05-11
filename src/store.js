class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.selectedItemCode = null;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
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
    const newCode =
      this.state.list.length > 0 ? Math.max(...this.state.list.map((item) => item.code)) + 1 : 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись ' }],
    });
  }

  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  selectItem(code) {
    const newList = this.state.list.map((item) => {
      if (item.code === code) {
        item.selected = !item.selected;
      } else {
        item.selected = false;
      }
      return item;
    });

    let newSelectedCount = newList.filter((item) => item.selected).length;

    if (this.selectedItemCode !== code && newList.find((item) => item.code === code)?.selected) {
      this.selectedItemCode = code;
    } else if (
      this.selectedItemCode === code &&
      !newList.find((item) => item.code === code)?.selected
    ) {
      this.selectedItemCode = null;
      newSelectedCount--;
    }

    this.setState({
      ...this.state,
      list: newList,
      selectedCount: newSelectedCount,
    });
  }
}

export default Store;
