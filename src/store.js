/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.uniqueValues = new Set()
  }

  generateValue() {
    const num = Math.floor(Math.random() * (100 - 8 + 1)) + 8

    if (this.uniqueValues.has(num)) {
      return this.generateValue()
    } else {
      this.uniqueValues.add(num)
      return num
    }
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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: 
        [...this.state.list, 
        {
          code: this.generateValue(),
          title: 'Новая запись',
          selectedCount: 0
        }]
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
              item.selectedCount++
              item.title = `Новая запись | Выделяли ${item.selectedCount} раз`
            }
        } else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
