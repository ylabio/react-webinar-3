/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initialList = initState.list || [];

    this.state = {
      list: initialList.map((element) => ({ ...element, selectedCount: 0 })),
      codeSetted: initialList.reduce((max, item) => Math.max(max, item.code), 0),
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
    const newCode = this.state.codeSetted + 1;
    this.setState({
      ...this.state,
      codeSetted: newCode,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
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
  selectItem(event, code) {   
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            if(!item.selected) {
              item.selectedCount++
            } 
            item.selected = !item.selected;
          } else if(!event.ctrlKey)
            {
              item.selected = false
            }
          return item;
        }),
      });
    
    
  }
}

export default Store;
