/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.newItemCount = this.state.list.length;
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
    this.newItemCount +=1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.newItemCount, title: 'Новая запись', count: 0 }],
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
   * Выделяет запись по коду и сбрасывает выделение у всех остальных записей
   * Но если нажата клавища Ctrl (event.ctrlKey === true), то выделение у других записей остается
   * @param code
   */
  selectItem(code, event) {
    console.log(this.state.list)
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (!event.ctrlKey && !event.metaKey) {
            this.state.list.map(droppedSelectItem => {
              if (droppedSelectItem.code !== code) {
                droppedSelectItem.selected = false;
              }
            });
          }
        }
        return item;
      }),
    });
  }

  /**
   * Выделение записи по коду
   * @param code - код записи
   */
  countSelectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected === true) {
            item.count += 1;
          }
        }
        return item;
      }),
    });
  }
}

export default Store;
