/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.numReserve = [];

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
      list: [...this.state.list, { code: this.randoomNumber(), title: 'Новая запись', count: 0 }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = true;
        }
        return item;
      })
    })
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };


  randoomNumber() {
    let k = 0;

    while (k < 1) {
      var randomNumber = Math.ceil(Math.random() * this.numReserve.length + 1 + 7);
      var found = false;
      for (var i = 0; i < this.numReserve.length; i++) {

        if (this.numReserve[i] === randomNumber) {
          found = true;
          break;
        }
      }

      if (!found) { this.numReserve[this.numReserve.length] = randomNumber; k++ }
    }
    this.numReserve = Array.from(new Set(this.numReserve));

    return this.numReserve.at(-1);

  }



  /**
   * Выделение записи по коду
   */
  selectItem(selected, code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {


        if (item.code === code) {
          item.selected = true;
          item.count = item.count + 1
        } else {
          item.selected = false;
        }
        if (item.code === code && true == selected) {
          item.selected = false;
          item.count = item.count - 1
        }
        return item;
      })
    })
  }
}

export default Store;
