/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.uniqueCodeCounter = initState.list ? Math.max(...initState.list.map(item => item.code)) : 0; // Текущее максимальное значение кода записи
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
    const newCode = this.generateUniqueCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectionCounter: 0 }]
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
      list: this.state.list.map(item => ({
        ...item,
        selected: item.code === code ? !item.selected : false,
        selectionCounter: item.code === code && !item.selected ? item.selectionCounter + 1: item.selectionCounter
      }))
    });
  }

  /**
   * Генерация уникального числа
   * @returns {number}
   */
  generateUniqueCode() {
    let newCode;
    do {
      newCode = Math.floor(Math.random() * 100);
    } while (this.state.list.some(item => item.code === newCode));
    this.uniqueCodeCounter = Math.max(this.uniqueCodeCounter, newCode);
    return ++this.uniqueCodeCounter;
  }
}

export default Store;
