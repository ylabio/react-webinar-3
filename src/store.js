/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      nextCode:
        initState.list && initState.list.length > 0
          ? Math.max(...initState.list.map(item => item.code)) + 1
          : 1, // Инициализация nextCode на основе максимального кода в initState
    };
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
    const newCode = this.state.nextCode;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: newCode, title: 'Новая запись', selected: false, selectionCount: 0 },
      ],
      nextCode: newCode + 1,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // list: this.state.list.filter(item => item.code !== code),
      list: this.state.list
        .filter(item => item.code !== code) // Удаление записи запись
        .map(item => ({ ...item })), // Сохранение состояния selected для остальных записей
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, isCtrlPressed = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelectedState = !item.selected;

          return {
            ...item,
            selected: newSelectedState,
            selectionCount: newSelectedState ? item.selectionCount + 1 : item.selectionCount,
          };
        } else if (!isCtrlPressed) {
          return { ...item, selected: false };
        }
        return item;
      }),
    });
  }
}

export default Store;
