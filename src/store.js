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
      list: [...this.state.list, {code: Date.now(), title: 'Новая запись'}]
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
  selectItem(ev, code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.numberSelections = item.numberSelections ? item.numberSelections + 1 : 1;
            item.textNumberSelections = this.changeEndingWord(item.numberSelections, ["раз", "раза"]);
          }
        } else if(ev.target.tagName !== "BUTTON"){
          item.selected = false;
        }
        return item;
      })
    })
  }

  /**
   * Склонение слова в зависимости от числа
   */
  changeEndingWord(num, textForms) {
    num = num % 100; 
    const num1 = num % 10;
    if (num > 10 && num < 20 || num1 == 1) { return textForms[0]; }
    if (num1 > 1 && num1 < 5) { return textForms[1]; }
    return textForms[0];
  }

}

export default Store;
