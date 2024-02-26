/**
 * Хранилище состояния приложения
 */
class Store {
  #currentItemCode = 0; // приватное поле, счётчик для генерации кода записи
  #itemsCodes; // приватное поле, множество значений актуальных кодов записей
  constructor(initState = {}) {
    this.listeners = []; // Слушатели изменений состояния
    this.setState(initState);
    if (this.state.list) { // инициализируем счётчик максимальным значением кода записи в списке
      this.#currentItemCode = this.state.list.reduce((acc, item) => item.code > acc ? item.code : acc, 0);
    }
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
    this.#itemsCodes = new Set(this.state.list.map(item => item.code)); // актулизируем при изменениях состояния
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
  * Генерация нового кода записи, приватный метод
  * @returns {Number}
  */
  #getNewItemCode() {
    if (this.#currentItemCode >= Number.MAX_SAFE_INTEGER) {
      this.#currentItemCode = 0; // перестраховка на случай "переполнения"
    }
    this.#currentItemCode += 1;
    while (this.#itemsCodes.has(this.#currentItemCode)) { // удостоверимся, что совпадений точно нет
      this.#currentItemCode += 1;
    }
    return this.#currentItemCode
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.#getNewItemCode(), title: 'Новая запись' }]
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
          if (item.selected) {
            item.counter = item.counter ? item.counter += 1 : item.counter = 1;
          }
        } else { // снимаем выделение с остальных
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
