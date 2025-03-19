/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.nextId = this.getInitialNextId();
  }

  getInitialNextId() {
    const maxCodeNumber = (this.state.list || []).reduce(
      (maxNumber, curItem) => (curItem.code > maxNumber ? curItem.code : maxNumber),
      0,
    );

    return maxCodeNumber + 1;
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
      list: [...this.state.list, { code: this.nextId++, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param addToSelected
   */
  selectItem(code, addToSelected) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const isSelected = item.selected;

        if (item.code === code) {
          if (!isSelected) {
            item.numberOfSelections = (item.numberOfSelections || 0) + 1;
          }

          item.selected = !isSelected;
        } else if (!addToSelected) {
          item.selected = false;
        }

        return item;
      }),
    });
  }
}

export default Store;
