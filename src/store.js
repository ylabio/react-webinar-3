/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map((item) => ({ ...item, selectionCounter: 0 })) // task3. Добавим selectionCounter
    };
    this.listeners = []; // Слушатели изменений состояния
    this.lastId = this.state.list.length + 1; // task2. Запишем последний id из initData
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
      list: [...this.state.list, {code: this.lastId++, title: 'Новая запись', selectionCounter: 0}] // task2. получаем uid в рамках сессии
    })
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
        // task1. Просто добавим в else, чтобы для всех ненужных нам item.selected было false
        // task3. Прибавляем в selectionCounter при выборе item (если он изначально не выбран)
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectionCounter++;
          }
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
