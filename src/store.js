class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      selectedIds: new Set(),
      clickCounts: new Map(),
      lastCode: 7,
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
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

  /**
   * Добавление новой записи
   */
  addItem() {
    this.state.lastCode += 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.lastCode, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const updatedList = this.state.list.filter(item => item.code !== code);
    const updatedSelected = new Set(this.state.selectedIds);
    const updatedCounts = new Map(this.state.clickCounts);
    updatedCounts.delete(code);

    this.setState({
      ...this.state,
      list: updatedList,
      selectedIds: updatedSelected,
      clickCounts: updatedCounts,
    });
  }

  toggleSelection(itemCode, shouldIncrement) {
    const newSelectedIds = new Set(this.state.selectedIds);
    const isCurrentlySelected = newSelectedIds.has(itemCode);

    if (isCurrentlySelected) {
      newSelectedIds.delete(itemCode);
    } else {
      newSelectedIds.add(itemCode);
    }

    this.setState({
      ...this.state,
      selectedIds: newSelectedIds,
      clickCounts: shouldIncrement
        ? new Map(this.state.clickCounts).set(
            itemCode,
            (this.state.clickCounts.get(itemCode) || 0) + 1,
          )
        : this.state.clickCounts,
    });
  }
}

export default Store;
