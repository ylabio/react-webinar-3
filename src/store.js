/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode =
      this.state.list.length > 0 ? Math.max(...this.state.list.map(item => item.code)) : 0;
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
    this.maxCode += 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.maxCode, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, ctrlKey = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Переключаем выделение для текущей записи
          return { ...item, selected: !item.selected };
        } else if (!ctrlKey) {
          // Сбрасываем выделение с остальных записей, если Ctrl/Cmd не удерживается
          return { ...item, selected: false };
        }
        // Если Ctrl/Cmd удерживается, оставляем выделение других записей без изменений
        return item;
      }),
    });
  }
}

export default Store;
