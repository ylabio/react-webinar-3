/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }
  counter = 0;  // переменная счётчика (0 начальное значение)
  numId = 8;  // Id записи (8 начальное значение)

  // функция для прибавления счётчика
  increment () {
    return this.counter += 1;
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
      list: [...this.state.list, {code: this.numId, title: 'Новая запись'}]// вывожу Id записи
    })
    this.numId += 1;//прибавляю Id для следующий записи
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
        
        if (item.code === code) {// Если итем равняется
          item.selected = !item.selected;//то меняем истуну на лож или наоборот у выделения итема
        }
        else {// если итем не равняется
          item.selected = false;//то выделение лож
        }
        if (item.selected == true) {//если выделение истина
          this.increment();// то прибавляем единицу к счётчику выделений
        }
        return item;
      })
    })
  }
}

export default Store;
