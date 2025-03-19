/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // Инициализируем lastCode на основе существующих записей или 0, если записей нет.
    this.lastCode = initState.list && initState.list.length > 0
      ? Math.max(...initState.list.map(item => item.code))
      : 0;
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
   * Добавление новой записи с уникальным кодом
   */
  addItem() {
    this.lastCode++;
    const newItem = { code: this.lastCode, title: 'Новая запись', selectCount: 0 };
    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
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
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.selectCount = (item.selectCount || 0) + 1;
        }
        return item;
      }),
    });
  }

  /**
   * Множественное выделение записи без сброса других выделений
   */
  selectAdditionalItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.selectCount = (item.selectCount || 0) + 1;
        }
        return item;
      }),
    });
  }

  /**
   * Сброс выделения всех записей
   */
  clearSelection() {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => ({ ...item, selected: false })),
    });
  }

  /**
   * Снятие выделения записи по коду
   */
  deselectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
