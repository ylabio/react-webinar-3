/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.counter = this.state.list?.length > 0 ? Math.max(...this.state.list.map(item => item.code)) + 1 : 1;
    this.state.list = this.state.list.map(item => ({
      ...item,
      selectionCount: item.selectionCount || 0
    }));
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
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.counter, title: 'Новая запись', selected: false, selectionCount: 0 }],
    });
    
    this.counter += 1;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    console.log(this.state);
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, isPressed=false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectionCount += 1;
          }
        } else if (!isPressed) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
