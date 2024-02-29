/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.nextcode = initState.list.length + 1; // Initial next code for new item !!
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
    }
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
      // fix: coding of item is below !!
      list: [...this.state.list, {code: this.nextcode, title: 'Новая запись'}]
    });
    this.nextcode += 1;
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          // fix: selecting of item is below !!
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }

  /**
   * Feat: Counting of selecting
   */
  countSelect() {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.selected && item.count) {
          item.count += 1;
        } else if (item.selected && !item.count) {
          item.count = 1;
        }
        return item;
      })
    })
  }
}

export default Store;
