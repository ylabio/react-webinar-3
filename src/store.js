/**
 * Хранилище состояния приложения
 */




class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.uniqueNumbers = [];
    this.count = 0; // Слушатели изменений состояния
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    this.state.list.map(item => {
      if (!this.uniqueNumbers.includes(item.code)){
        this.uniqueNumbers.push(item.code);
        item.count = this.count
      }
      
      
    })
    console.log(this.state.list);
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
   * Генерация уникального кода для записи и добавление новой записи
   */

  
  generateUniqueNumbers() {
    let code = Math.floor(Math.random() * 100);
    while (this.uniqueNumbers.includes(code)) {
      code = Math.floor(Math.random() * 100);
    }
    this.uniqueNumbers.push(code);
    return code;
  }

  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.generateUniqueNumbers(),
          title: "Новая запись",
          count: this.count,
        },
      ],
    });
    console.log(this.state.list.count);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * 
   * 
   */


  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.count++;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
