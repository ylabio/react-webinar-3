/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastNumber= Math.max(...this.state.list.map(({code}) => code)) || 0;
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
    // Генерируем уникальной код
	  const сodeNew = ++this.lastNumber;
    this.setState({
      ...this.state,
      // list: [...this.state.list, {code: this.state.list.length + 1, title: 'Новая запись'}]

      list: [...this.state.list, {code: сodeNew, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      // ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
    // item=item-1;
    // item.selected=!item.selected
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      // ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          
          if (item.selected) { 
            item.clikCount = (item.clikCount || 0) + 1;
                }
          
        } 
        else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
