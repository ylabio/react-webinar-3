/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    const codeList = this.state.list.map(item=>item.code);
    console.log('codeList', codeList);
    this.state.currentCode =  Math.max(...this.state.list.map(item=>item.code));
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
    console.log(this.state);
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
    const actualCurrentCode = this.state.currentCode + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: actualCurrentCode, title: `Новая запись ${actualCurrentCode}`}],
      currentCode: actualCurrentCode,
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
    let actualCode = null;
    let actualCounter = {...this.state.counter};
    if (code !== this.state.selectedItemCode) {
      actualCode = code;
      if (actualCounter[code]) {
        actualCounter[code] = actualCounter[code] + 1;
      } else {
        actualCounter[code] = 1;
      }
    }

    this.setState({
      ...this.state,
      selectedItemCode: actualCode,
      counter: actualCounter
    })
  }
}

export default Store;
