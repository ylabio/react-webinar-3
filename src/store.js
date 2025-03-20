/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      lastCode: initState.list?.reduce((max, item) => Math.max(max, item.code), 0) || 0,
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
   * Добавление новой записи с уникальным идентификатором
   */
  addItem() {
    const newCode = this.state.lastCode + 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      lastCode: newCode, // Обновляем последний использованный идентификатор
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
   * @param isCtrlPressed - нажата ли клавиша Ctrl (cmd)
   */
  selectItem(code, isCtrlPressed) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: isCtrlPressed ? !item.selected : !item.selected && true,
            selectionCount: (item.selectionCount || 0) + (item.selected ? 0 : 1), // Увеличиваем только при выделении
          };
        }
        return isCtrlPressed ? item : { ...item, selected: false }; // Сброс, если не зажат Ctrl
      }),
    });
  }
}

export default Store;
