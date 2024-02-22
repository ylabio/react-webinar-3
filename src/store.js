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
   * Генерация числа и проверка на уникальность
   */
  generateUniqueCode() {
    let uniqueCode;
    do {
      uniqueCode = Math.floor(Math.random() * 1000);
    } while (this.state.list.some(item => item.code === uniqueCode));

    return uniqueCode;
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    let uniqueCode = this.generateUniqueCode();

    this.setState({
        ...this.state,
        list: [...this.state.list, {code: uniqueCode, title: 'Новая запись'}]
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
            item.choiceCount = (item.choiceCount || 0) + 1; // Счетчик кликов
          }
        } else {
          item.selected = false; // Сбросить выделение с других записей
        }
        return item;
      })
    })
  }
}

export default Store;
