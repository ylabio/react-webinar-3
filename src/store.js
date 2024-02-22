/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list ? initState.list.map(item => ({...item, selectedCount: 0})) : []
    };
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = this.getLastCode(); // Последний использованный код
  }

  getLastCode() {
    if (!this.state || !this.state.list || !Array.isArray(this.state.list) || this.state.list.length === 0) {
      return 0; // Возвращаем 0, если список пуст
    }
    // Ищем максимальный код в текущем списке
    return Math.max(...this.state.list.map(item => item.code));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  generateUniqueCode() {
    return ++this.lastCode;
  }

  addItem() {
    const newCode = this.generateUniqueCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectedCount: 0 }]
    })
  };

  deleteItem(codeToDelete) {
    const updatedList = this.state.list.filter(item => item.code !== codeToDelete);
    this.setState({
      ...this.state,
      list: updatedList
    });
  };

  selectItem(code) {
    if (!this.state || !this.state.list || !Array.isArray(this.state.list)) {
      return;
    }

    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        item.selected = !item.selected;
        item.selectedCount++; // Увеличиваем счетчик выделений
      } else {
        item.selected = false;
      }
      return item;
    });

    this.setState({
      list: updatedList
    });
  }
}

export default Store;


