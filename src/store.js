/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastUniqCode = Math.max(0, ...this.state.list.map(item => item.code)); // code последнего элемента
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
    this.lastUniqCode++;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.lastUniqCode, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   * @param evt {MouseEvent} - Событие клика
   */
  deleteItem(code, evt) {
    evt.stopPropagation(); //предотвращаем всплытие, чтобы не влияло на selected

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param evt {MouseEvent} - Событие клика
   */
  selectItem(code, evt) {

    const isMultiSelect = evt.ctrlKey || evt.metaKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            selectedCount: (item.selected ? item.selectedCount : (item.selectedCount || 0) + 1)
          }
        }
        return isMultiSelect ? item : {...item, selected: false};
      }),
    });
  }
}

export default Store;
