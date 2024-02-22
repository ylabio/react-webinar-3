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

  /**
   * Добавление новой записи
   */
  addItem() {
    const num = this.generateNum();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: num, title: 'Новая запись' }]
    });
  }

  generateNum() {
    const usedNums = new Set(this.state.list.map(item => item.code));
    let newNum = this.state.list.length + 1;
    while (usedNums.has(newNum)) {
      newNum++;
    }
    return newNum;
  }

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
          item.clickCount = (item.clickCount || 0) + 1;
          if (item.clickCount % 2 !== 0) {
            console.log(`Выделяли ${Math.ceil(item.clickCount / 2)} раз`);
          }
        } else {
          item.selected = false;
        }
        return item;
      })
    });
  }
}

export default Store;
