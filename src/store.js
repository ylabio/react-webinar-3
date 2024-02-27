/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastGeneratedNum = 7;
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
    const newCode = ++this.lastGeneratedNum;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }]
    });
  }

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
          item.clickCount = (item.clickCount || 0) + 1;
          item.selectCount = Math.ceil(item.clickCount / 2);
          item.wordForm = this.chooseWordForm(item.selectCount);
          }
        else {
          item.selected = false; }
        return item;
      })
    });
  }

  chooseWordForm(number) {
    if (number % 10 === 1 && number % 100 !== 11)
      return 'раз'
    else if ((number % 100 < 10 || number % 100 > 20) && (number % 10 === 2 || number % 10 === 3 || number % 10 === 4))
      return 'раза'
    else
      return 'раз'
  }
}

export default Store;
