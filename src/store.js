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
    /* this.state = this.state.list.map((elem, i) => {
      
    }); */
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    console.log(this.listeners);
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(num) {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: num ? this.state.list[this.state.list.length-1].code + 1 : 1, title: 'Новая запись', counter: 0}]
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
  selectItem(code, bool) {
    if (!bool) {
      let obj = this.state.list.map(elem => {
        if (elem.selected) delete elem.selected;
        return elem;
      });
  
      this.setState({
        ...this.state,
        list: obj.map(item => {
          if (item.code === code) {
            item.selected = !item.selected;
            item.counter++;
          }
          return item;
        })
      })
    } else {
      const obj = this.state.list.map(elem => {
        if (elem.selected) delete elem.selected;
        return elem;
      })

      this.setState({list: obj});
    }
  };
}

export default Store;
