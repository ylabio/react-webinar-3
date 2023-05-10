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
   * Генератор числовых ключей в диапазоне от 1 до 999 включительно с учетом уже имеющихся ключей
   */

  getKey() {
    const itemsCodes = this.state.list.map(item => item.code);
    let newKey = Math.floor(Math.random() * (1000 - 1)) + 1;
    while (itemsCodes.includes(newKey) && itemsCodes.length < 1000) {
      newKey = Math.floor(Math.random() * (1000 - 1)) + 1;
    }
    return newKey;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getKey(), title: 'Новая запись', selectionsCount: 0}]
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
        item.selected = item.code === code ? !item.selected : false;
        if (item.selected) {
          item.selectionsCount++
        }
        return item;
      })
    })
  }
}

export default Store;
