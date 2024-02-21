/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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

  generateId() {
    const limit = 100;
    let attempts = 0;
    let id = false;
    while (!id && attempts < limit) {
      // Максимум 1 000 уникальных комбинаций
      id = new Date().valueOf().toString().slice(-3);

      let match = this.state.list.find(item => {
        return item.code.toString() === id;
      });

      if (match) {
        id = false; 
        attempts++;
      }
    }
    return id;
  };

  /**
   * Добавление новой записи
   */
  addItem() {
    const code = this.generateId();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code, title: 'Новая запись' }]
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
        if (item.code === code) {
          if (!item.selectionCount) item.selectionCount = 100;

          if (!item.selected) item.selectionCount++;

          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
