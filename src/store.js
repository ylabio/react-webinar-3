/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = 7; // Последний созданный ид записи. FIXME - обнулить
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
   * Обновление счетчика последней записи
   */
  updateCounter() {
    this.lastCode = this.lastCode + 1
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.updateCounter(); // обновляем счетчик
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.lastCode, title: 'Новая запись', selectCount: 0}],
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
          item.selectCount = item.selected ? item.selectCount + 1 : item.selectCount; // Увеличивает счетчик выделений
        }
        return item;
      })
    })
  }
}

export default Store;
