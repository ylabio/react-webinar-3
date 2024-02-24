/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = this.state.list ? Number(Math.max(...this.state.list.map(i => i.code))) : 1; 
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
      list: [...this.state.list, {code: ++this.lastCode, title: 'Новая запись'}]
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
        if (item.code === code && !item.selected) {
          item.selected = !item.selected;
          item.counter = this.counter(item);
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }

  /**
   * Выведение количества совершенных выделений для каждого пункта
   * @param selectedItem {Object}
   */
  counter(selectedItem) {
    if (selectedItem.counter) {
      const n = parseInt(selectedItem.counter) + 1;
      let lastWord = 'раз';
      if (n > 1 && n < 5) {
        lastWord = 'раза';
      } 
      if (n > 21) {
        const arr = n.toString().split('').slice(-2);
        if (+arr[0] != 1 && +arr[1] > 1 && +arr[1] < 5) {
          lastWord = 'раза'
        }   
      }
      return `${n} ${lastWord}` 
    } else {
      selectedItem.counter = 1;
      return `1 раз`
    }
  }
}

export default Store;
