/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
  addItem(lastCode) {
    this.setState({
      ...this.state,
      list: [...this.state.list, {
        code: this.state.lastCode + 1,  
        title: 'Новая запись',
        count: 0
      }],
      lastCode: this.state.lastCode + 1
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
  selectItem(event, code, count, pluralize) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        pluralize = ['раз', 'раза'];
        event.stopPropagation(); 
        
        if (!item.selected && item.code === code && ((event.ctrlKey || event.metaKey) || !(event.ctrlKey || event.metaKey))) {
          item.selected = true;
          count = count + 1;
          item.count = count;

          if (
            count === 12 ||
            count === 13 ||
            count === 14 ||
            count % 100 === 12 ||
            count % 100 === 13 ||
            count % 100 === 14) {
            item.pluralize = pluralize[0];
          } else if (
            count === 2 || 
            count === 3 || 
            count === 4 || 
            count % 10 === 2 || 
            count % 10 === 3 || 
            count % 10 === 4) {
            item.pluralize = pluralize[1];
          } else {
            item.pluralize = pluralize[0];
          }
          
        } else if (item.selected && item.code === code && (event.ctrlKey || event.metaKey)) {
          item.selected = false;
        } else if (item.selected && (item.code !== code || item.code === code) && !(event.ctrlKey || event.metaKey)) {
          item.selected = false;
        }
        
        return item;
      }),
    });
  }
}

export default Store;
