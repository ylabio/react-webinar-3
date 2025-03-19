/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initialList = initState.list || [];
    const maxCode = initialList.length > 0 ? Math.max(...initialList.map(item => item.code)) : 0;

    this.state = {
      list: initialList,
      lastCode: maxCode,
      ...initState,
    };
    this.listeners = [];
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
    const currentState = this.getState(); // Получаем текущее состояние
    const newCode = currentState.lastCode + 1;
    this.setState({
      list: [...currentState.list, { code: newCode, title: 'Новая запись' }],
      lastCode: newCode,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const currentState = this.getState();
    this.setState({
      list: currentState.list.filter(item => item.code !== code),
      lastCode: currentState.lastCode,
    });
  }

  selectItem(code) {
    const currentState = this.getState();
    this.setState({
      list: currentState.list.map(item => ({
        ...item,
        selected: item.code === code ? !item.selected : item.selected,
      })),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param event
   */
  selectItem(code, event) {
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    const newList = this.state.list.map(item => {
      if (item.code === code) {
        // Если Ctrl не зажата, мы снимаем выделение с других элементов
        if (!isCtrlPressed) {
          // Если запись не была выделена, теперь она будет выделена
          if (!item.selected) {
            item.selected = true;
            // Увеличиваем счетчик, когда запись только что выделена
            item.selectionCount = (item.selectionCount || 0) + 1;
          } else {
            item.selected = false;
          }
        } else {
          // Если Ctrl зажата, меняем только выделение этой записи
          item.selected = !item.selected;
          // В случае, если запись была выделена, то счетчик не меняется
          if (item.selected) {
            // Увеличиваем только при выделении записи
            item.selectionCount = (item.selectionCount || 0) + 1;
          }
        }
      } else {
        if (!isCtrlPressed) {
          item.selected = false;
        }
      }
      return item;
    });

    this.setState({
      list: newList,
      lastCode: this.state.lastCode,
    });
  }
}

export default Store;
