/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      lastCode: Math.max(...initState.list.map(item => item.code), 0), 
    };
    this.listeners = [];
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
    const newCode = this.state.lastCode + 1; // Генерируем новый уникальный код
    this.setState({
      ...this.state,
      lastCode: newCode,
      list: [
        ...this.state.list,
        { code: newCode, title: 'Новая запись', selected: false, selectionCount: 0 },
      ],
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
   * @param isCtrlPressed {boolean} Нажата ли клавиша Ctrl/Cmd
   */
  selectItem(code, isCtrlPressed) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected; 
          item.selectionCount = (item.selectionCount || 0) + 1; 
        } else if (!isCtrlPressed) {
          item.selected = false; 
        }
        return item;
      }),
    });
  }
}

export default Store;
