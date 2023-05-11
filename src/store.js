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





  unitGenerCode = () => {
    let max = 1
    for (let i = 0; i < this.state.list.length; i++) {     // ДЗ 2 создание уникального coda
      if ((this.state.list)[i].code > max) {
        max = (this.state.list)[i].code
      }
    }
    return max + 1
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.unitGenerCode(), title: 'Новая запись', counter: 0}]
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
          if(item.selected){
            item.counter++                      // ДЗ 3 сбрасываем  колличество выделений
          }

        }else {                                    // ДЗ 1 сбрасываем выделение у других
          item.selected=false
        }
        return item;
      })
    })
        console.log(code)
  }
}

export default Store;
