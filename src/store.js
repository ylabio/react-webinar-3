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
      list: [...this.state.list, {code: this.listUsedCodes, title: 'Новая запись'}] //добавление нового элемента с не использованным code
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
          item.selected = !item.selected;
          item.selectedTimes = 1
          item.title = item.title + '| Выделяли' + item.selectedTimes + 'раз'
          if(item.selected){
            item.selectedTimes++ //Не успела доработать чтобы менялось только число раз
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
