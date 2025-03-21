/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.startCount = 0; // Счетчик записей
  }

  init() {
    const maxCode = this.state.list.reduce(
      (item, currentValue) => item.code > currentValue ? item.code : currentValue,
        this.state.list[0].code
    ).code;
    this.startCount = maxCode + 1;  
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
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.getNextCodeG(this.startCount), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, env) {
    env.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, key) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        return {
          ...item,
          selected: key ? ( item.code === code ? !item.selected : item.selected) : (item.code === code && !item.selected),
          selectCount: item.code === code && !item.selected ? item.selectCount + 1 : item.selectCount
        }
      }),
    });
  }

  getNextCode() {
    const maxCode = this.state.list.reduce(
      (item, currentValue) => item.code > currentValue ? item.code : currentValue,
        this.state.list[0].code
    ).code;
    return maxCode + 1;
  }

  
  getNextCodeG() {
    this.startCount+= 1
    return this.startCount 
  }
}

export default Store;
