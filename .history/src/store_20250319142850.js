/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes =[];
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
    const { list } = this.state;
    const usedCodes = list.map(item => item.code);
    const maxCode = Math.max(...usedCodes);

    let newCode = maxCode + 1;

    if (this.usedCodes.length > 0) {
      newCode = Math.min(...this.usedCodes);
      this.usedCodes = this.usedCodes.filter(code => code !== newCode);      
    }

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectCount: 0 }],
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
   * @param isCtrlPressed
   * @param code
   */
  selectItem(code , isCtrlPressed) {
    const { list } = this.state;
    const newList = list.map(item => {
      if (item.code === code) {
        if(!item.selected) {
          return {
            ...item,
            selected: true,
            selectCount: item.selectCount + 1,
          };
        } else {
          return {
            ...item,
            selected: false,
            selectCount: item.selectCount,
          };
        }
      }
      return {
        ...item,
        selected: isCtrlPressed ? item.selected : false,
      };
    });

    this.setState({
      ...this.state,
      list: newList,
    });
  }
}

export default Store;
