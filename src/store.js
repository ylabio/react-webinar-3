class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      selectedIds: new Set(),
      clickCounts: new Map(),
      lastCode: 7,
      ...initState,
    };
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
    this.state = {
      ...this.state,
      ...newState,
    };
    for (const listener of this.listeners) listener();
  }

  addItem() {
    this.state.lastCode += 1;
    this.setState({
      list: [...this.state.list, { code: this.state.lastCode, title: 'Новая запись' }],
    });
  }

  deleteItem(code) {
    const updatedList = this.state.list.filter(item => item.code !== code);

    const newSelectedIds = new Set(this.state.selectedIds);
    newSelectedIds.delete(code);

    this.setState({
      list: updatedList,
      selectedIds: newSelectedIds,
    });
  }

  toggleSelection(itemCode, event) {
    const newSelectedIds = new Set(this.state.selectedIds);
    const ctrlPressed = event.ctrlKey || event.metaKey;
    const isCurrentlySelected = this.state.selectedIds.has(itemCode);

    if (ctrlPressed) {
      if (isCurrentlySelected) {
        newSelectedIds.delete(itemCode);
      } else {
        newSelectedIds.add(itemCode);
      }
    } else {
      if (!isCurrentlySelected) {
        newSelectedIds.clear();
        newSelectedIds.add(itemCode);
      } else {
        newSelectedIds.delete(itemCode);
      }
    }

    const newClickCounts = new Map(this.state.clickCounts);
    if (newSelectedIds.has(itemCode)) {
      newClickCounts.set(itemCode, (this.state.clickCounts.get(itemCode) || 0) + 1);
    }

    this.setState({
      selectedIds: newSelectedIds,
      clickCounts: newClickCounts,
    });
  }
}

export default Store;
