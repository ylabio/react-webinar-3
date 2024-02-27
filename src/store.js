/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.listUsedCodes = initState.list.length; //Использованые code
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
    this.listUsedCodes++ //Увеличение использованного code на единицу с каждым добавленым пунктом
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.listUsedCodes, title: 'Новая запись', select: 0}] //добавление нового элемента с не использованным code
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(event, code) {
    event.stopPropagation();
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
          if(item.selected){
            item.select = ++item.select; //счетчик прибавляется при выделении
          }
        } else {
            item.selected = ""; //выделение снимается
        }
        return item;
      })
    })
  }
}

export default Store;
