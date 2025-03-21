/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list,
    };
    this.listeners = [];// Слушатели изменений состояния 

    this.nextCode = this.state.list.length > 0 
      ? Math.max(...this.state.list.map(item => item.code)) + 1 
      : 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newItem = {
      code: this.nextCode,
      title: 'Новая запись',
      selected: false,
      selectCount: 0,
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });

    this.nextCode += 1;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const newList = this.state.list.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      list: newList,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param isCtrlPressed 
   */
  selectItem(code, isCtrlPressed) {
  
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        return {
          ...item,
          selected: !item.selected,
          selectCount: item.selected ? item.selectCount : (item.selectCount || 0) + 1,
        };
      } else if (!isCtrlPressed) {
        return {
          ...item,
          selected: false,
        };
      }
      return item; 
    });
  
    this.setState({
      ...this.state,
      list: updatedList,
    }, () => {
    });
  }
}

export default Store;