/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
    };
    this.listeners = []; // Слушатели изменений состояния
    this.codeMaximum = 0;

    if(this.state.list.length > 0) {
      this.codeMaximum = Math.max(...this.state.list.map(item => item.code)) + 1;
    }
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
      code: this.codeMaximum,
      title: 'Новая запись',
      selectionCount: 0,
    };
    this.codeMaximum++;
    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const updatedList = this.state.list.filter(item => item.code !== code);
    if (code === this.codeMaximum - 1) {
      this.codeMaximum = Math.max(...updatedList.map(item => item.code), 0) + 1; 
    }

    this.setState({
      list: updatedList,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    const ctrlPressed = event.ctrlKey || event.metaKey; 

    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        let updatedItem = {
          ...item,
          selected: ctrlPressed ? !item.selected : true,
        };
        if (!ctrlPressed || !item.selected) {
          updatedItem.selectionCount++; // Увеличиваем счетчик выделений
        }
        return updatedItem;
      }
      return {
        ...item,
        selected: ctrlPressed ? item.selected : false,
      };
    });

    this.setState({
      list: updatedList,
    });
  }

  getSelectionCounts() {
    return this.state.list
      .map(item => {
        if (item.selectionCount > 0) {
          return `Выделяли ${item.selectionCount} раз`;
        }
        return null;
      })
      .filter(Boolean); 
  }
}

export default Store;
