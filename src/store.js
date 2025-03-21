/**
 * Хранилище состояния приложения
 */
class Store {
  static counter = 7;
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
    };
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
    Store.counter++
    this.setState({
      ...this.state,
      list: [...this.state.list, { code:Store.counter, title: 'Новая запись',selectCount:0}],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code,event) {
    console.log(event.ctrlKey)
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {

        if (item.code === code) {
          if(!item.selected) //Считаем только выделение, без его снятия
            item.selectCount++;
          item.selected = !item.selected;
        }
        else if(!event.ctrlKey){
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
