/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.codeCounter = this.state.list.length;// измеряет длину массива записей
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
    this.codeCounter++; //добавляет 1
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.codeCounter, title: 'Новая запись'}]
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
  selectItem(code) { //исправление для задачи 1:
    this.setState({
      ...this.state,
      list: this.state.list.map(item => { //перебор элементов и возврат массива обновленных элементов
        if (item.code === code) {//если code совпадает
          item.selected = !item.selected; // то изменяется класс
          if (item.selectCount && item.selected) {
            item.selectCount++; //следующий элемент
          }
          if (!item.selectCount) { // если выделяется впервые
            item.selectCount = +1; 
          }
        } else {
          item.selected = false; //если code не соответствует коду элемента => сброс выделения
        }
        return item;
      })
    })
  }
}

export default Store;
