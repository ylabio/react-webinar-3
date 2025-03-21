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
  addItem(e) {
    e.stopPropagation();
    const maxCode = this.state.list.reduce((max, item) => Math.max(max, item.code), 0);
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: maxCode + 1, title: 'Новая запись', count: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, e) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const isCtrlPressed = e.ctrlKey || e.metaKey;

        if (item.code === code) {
          // Если запись уже выделена и Ctrl не нажата, снимаем выделение
          if (item.selected && !isCtrlPressed) {
            item.selected = false;
          } else {
            item.selected = true; // Выделяем запись
            item.count++;
          }
        } else if (!isCtrlPressed) {
          item.selected = false; // Сбрасываем выделение с других записей
        }
        return item;
      }),
    });
  }
}

export default Store;