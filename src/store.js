/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set(this.state.list.map(item => item.code)); // Храним использованные коды
    this.nextCode = 1; // Следующий уникальный код
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
    // Находим следующий уникальный код
    while (this.usedCodes.has(this.nextCode)) {
      this.nextCode++;
    }
    // Добавляем код в использованные
    this.usedCodes.add(this.nextCode);

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.nextCode, title: 'Новая запись', selectionCount: 0, selected: false }]
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
    });
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
          item.selectionCount = (item.selectionCount || 0) + (item.selected ? 1 : 0);
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
