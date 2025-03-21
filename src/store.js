/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initialList = initState.list || [];
    const maxCode = initialList.length > 0 
      ? Math.max(...initialList.map(item => item.code || 0)) 
      : 0;
    this.state = {
      ...initState,
      list: initialList,
      lastCode: maxCode,
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
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  addItem() {
    const newCode = this.state.lastCode + 1;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: newCode,
          title: 'Новая запись',
          selected: false,
          selectionCount: 0,
        },
      ],
      lastCode: newCode,
    });
  }

  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  selectItem(code, event) {
    const isCtrlPressed = event ? event.ctrlKey || event.metaKey : false;
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            selectionCount: !item.selected ? (item.selectionCount || 0) + 1 : item.selectionCount,
          };
        }
        if (!isCtrlPressed && item.selected) {
          return { ...item, selected: false };
        }
        return item;
      }),
    });
  }
}

export default Store;