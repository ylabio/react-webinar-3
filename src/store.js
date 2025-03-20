/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.nextCode =
      initState.list && initState.list.length > 0
        ? Math.max(...initState.list.map(item => item.code)) + 1
        : 1;
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
        { code: this.nextCode, title: 'Новая запись', selected: false, counter: 0 },
      ],
    });

    this.nextCode += 1;
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
   * @param isCtrlPressed
   */
  selectItem(code, isCtrlPressed = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Если запись уже выделена, снимаем выделение
          if (item.selected) {
            item.selected = false;
          } else {
            // Если Ctrl/Cmd не нажат, снимаем выделение со всех записей
            if (!isCtrlPressed) {
              this.state.list.forEach(i => (i.selected = false));
            }
            item.selected = true;
            item.selectionCount += 1; // Увеличиваем счетчик выделений
          }
        } else if (!isCtrlPressed) {
          // Если Ctrl/Cmd не нажат, снимаем выделение с других записей
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
