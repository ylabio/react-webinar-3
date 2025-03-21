/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    
    const list = initState.list || [];

    const maxCode = list.length
      ? Math.max(...list.map(item => item.code))
      : 0;
    
    const nextId = (typeof initState.nextId === 'number')
      ? initState.nextId
      : maxCode + 1;

    this.state = {
      ...initState,
      list,
      nextId,
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
    // Уведомляем всех подписчиков
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.state.nextId;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: newCode,
          title: `Новая запись ${newCode}`,
          selected: false,
          selectCount: 0,
        },
      ],
      nextId: newCode + 1,
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
   * @param event
  **/
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (event.ctrlKey || event.metaKey) {
          if (item.code === code) {
            return item.selected
              ? { ...item, selected: false }
              : { ...item, selected: true, selectCount: (item.selectCount || 0) + 1 };
          }
          return item;
        } else {
          if (item.code === code) {
            return item.selected
              ? { ...item, selected: false }
              : { ...item, selected: true, selectCount: (item.selectCount || 0) + 1 };
          } else {
            return { ...item, selected: false };
          }
        }
      }),
    });
  }
  
}

export default Store;
