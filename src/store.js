/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastId = initState.list[initState.list.length - 1].code;
    this.selectedItems = 0;
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
    this.hasSelectedItem()

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
    this.lastId += 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.lastId, title: 'Новая запись'}],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   * @param ev
   */
  deleteItem(code, ev) {
    ev.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Подсчет количества выделенных записей
   */
  hasSelectedItem() {
    this.selectedItems = this.state.list.filter(item => item.selected).length;
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param event
   */
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = this.selectedItems > 1 && (event.ctrlKey || event.metaKey) ? !item.selected : this.selectedItems > 1 ? true : !item.selected;
          if(item.selected) {
            item.selectedCount = item.selectedCount ? item.selectedCount + 1 : 1;
          }
        } else {
          if (!event.ctrlKey && !event.metaKey) {
            item.selected = false;
          }
        }

        return item;
      }),
    });

  }
}

export default Store;
