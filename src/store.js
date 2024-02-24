/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastUsedCode = this.state.list.length;
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
    }
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
   * Генератор значений Code
   */

  generateCode() {
    this.lastUsedCode += 1;
    return this.lastUsedCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.generateCode(), title: 'Новая запись', count: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выбор формы слова "раз"
   */

  getCountWordForm(count) {
    count %= 100;
    if (count >= 10 && count < 20) {
      return 'раз';
    }
    count %=10
    if ( count === 1) {
      return 'раз';
    } else if (count === 0 || count > 4) {
      return 'раз';
    } else {
      return 'раза';
    }
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.count ++;
            item.countWordForm = this.getCountWordForm(item.count);
          }
        } else 
          if (item.selected) {
            item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
