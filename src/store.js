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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.__generateRandomCode(), title: 'Новая запись', amount: 0}]
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
        if(item.code !== code) item.selected = false;
        if (item.code === code) {
          if(!item.selected) item.amount++
          item.selected = !item.selected;
        }
        return item;
      })
    })
  }

  /**
   * Генератор рандомного кода
   */
  __generateRandomCode(){
    let isUnique = false;
    let code
    while(!isUnique){
      code = Math.floor((Math.random() * 1000 + 1))
      isUnique = true;
      for (let item of this.state.list) {
        if(code == item.code){
          console.log(code == item.code);
          isUnique = false;
          break;
        }
      }
    }
    return code
  }
}

export default Store;
