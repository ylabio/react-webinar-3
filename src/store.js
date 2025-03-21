/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map(item => ({
        ...item,
        count: 0,
      })),
    };
    this.listeners = [];
    // Слушатели изменений состояния
    // Находим максимальный существующий код
    this.lastCode = Math.max(...initState.list.map(item => item.code), 0);
  }

  /**
   * Получение следующего уникального кода
   * @returns {number}
   */
  getNextCode() {
    return ++this.lastCode;
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
      list: [
        ...this.state.list,
        {
          code: this.getNextCode(),
          title: 'Новая запись',
          count: 0,
        },
      ],
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
   * @param code {number} Код записи
   * @param multiItem {boolean} Режим множественного выделения
   */
  selectItem(code, multiItem = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const willBeSelected = multiItem
          ? item.code === code
            ? !item.selected
            : item.selected
          : item.code === code
            ? !item.selected
            : false;

        const newCount =
          item.code === code && !item.selected && willBeSelected
            ? (item.count || 0) + 1
            : item.count || 0;

        return {
          ...item,
          selected: willBeSelected,
          count: newCount,
        };
      }),
    });
  }
}

export default Store;
