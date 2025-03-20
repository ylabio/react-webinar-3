/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    if (initState.list) {
      initState.list = initState.list.map(item => ({
        ...item,
        selectionCount: item.selectionCount || 0,
      }));
    }

    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    this.lastUsedCode = this.findMaxCode();
  }

  /**
   * Находит максимальный существующий код в списке
   * @returns {Number} Максимальный код
   */
  findMaxCode() {
    if (!this.state.list || this.state.list.length === 0) {
      return 0;
    }
    return Math.max(...this.state.list.map(item => item.code));
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
    this.lastUsedCode += 1;

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.lastUsedCode, title: 'Новая запись', selectionCount: 0 },
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
   * @param code
   */
  selectItem(code, isMultiSelect = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelected = !item.selected;
          const newSelectionCount = newSelected ? item.selectionCount + 1 : item.selectionCount;
          return {
            ...item,
            selected: newSelected,
            selectionCount: newSelectionCount,
          };
        }

        if (!isMultiSelect) {
          return { ...item, selected: false };
        }

        return item;
      }),
    });
  }
}

export default Store;
