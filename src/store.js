/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      lastCode: initState.list.length > 0 ? Math.max(...initState.list.map(item => item.code)) : 0, // Инициализируем lastCode
    //this.state = initState;
    //list: initState.list.map(item => ({
      list: initState.list ? initState.list.map(item => ({
      ...item, selectedCount: item.selectedCount || 0, // Инициализируем selectedCount
    })) : [],
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
    const newCode = this.state.lastCode + 1;
    this.setState({
      ...this.state,
      lastCode: newCode,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selected: false, selectedCount: 0 }],
      //list: [...this.state.list, { code: this.state.list.length + 1, title: 'Новая запись', selected: false }],
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
   * @param event {Mouse Event}
   */
  selectItem(code, event) {
    const isCtrlPressed = event.ctrlKey || event.metaKey; //проверка нажатия ctrl и cmd

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelectedState = !item.selected;
          return {...item, selected: newSelectedState, 
            selectedCount: !item.selected && newSelectedState ? item.selectedCount + 1: item.selectedCount,}; //увеличение счетчика при выделении
          //item.selected = !item.selected;
        }
        else if (!isCtrlPressed) { //если не нажато, снимаем выделение с других записей
          return {...item, selected: false};
          //item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
