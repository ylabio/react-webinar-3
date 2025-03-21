/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.NextCode = (this.state.list && this.state.list.length > 0)
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
    const newCode = this.NextCode;
    this.NextCode += 1;


    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selected: false, selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const newList = this.state.list.filter(item => item.code !== code); // Удаляем запись
    this.setState({
      ...this.state, // Копируем текущее состояние
      list: newList, // Обновляем только список
    });
  }



  /**
   * Выделение записи по коду
   * @param code
   */
  /**
 * Выделение записи по коду
 * @param code {number} Код записи
 */
  selectItem(code, isCtrlPressed = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelectionCount = item.selected ? item.selectionCount : item.selectionCount + 1;
          return {
            ...item,
            selected: !item.selected,
            selectionCount: newSelectionCount,
          };
        }
        if (!isCtrlPressed) {
          return {
            ...item,
            selected: false,
          };
        }
        return item;
      }),
    });
  }
}

export default Store;
