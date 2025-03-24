/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState,
      codes: initState.list?.map((item) => item.code) || [],
      list: initState.list?.map((item) => ({ ...item, numberSelected: 0 })) || [],
    }
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
    const newCode = Math.max(...this.state.codes) + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', numberSelected: 0 }],
      codes: [...this.state.codes, newCode]
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
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.numberSelected += 1;
          }
        } else if (!(event.ctrlKey || event.metaKey)){
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
