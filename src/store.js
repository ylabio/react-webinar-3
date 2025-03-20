/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = initState.list.length ? Math.max(...initState.list.map(item => item.code)) : 0;
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
    this.lastCode += 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.lastCode, title: 'Новая запись', selected: false, selectCount: 0 }],
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
   * @param ctrlPressed {boolean} - Зажат ли Ctrl/Cmd
   */
  selectItem(code, ctrlPressed) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (ctrlPressed) {
          // Множественное выделение с Ctrl/Cmd
          if (item.code === code) {
            return {
              ...item,
              selected: !item.selected,
              selectCount: item.selected ? item.selectCount : item.selectCount + 1
            };
          }
          return item;
        } else {
          // Одиночное выделение (сбрасываем остальные)
          if (item.code === code) {
            return {
              ...item,
              selected: !item.selected,
              selectCount: item.selected ? item.selectCount : item.selectCount + 1
            };
          }
          return { ...item, selected: false };
        }
      }),
    });
  }
}

export default Store;
