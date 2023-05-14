/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState
    this.listeners = [] // Слушатели изменений состояния
    // Уникальный код для списка
    this.uniqCode = initState?.list ? initState.list.length : 0
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener)
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener()
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.uniqCode += 1
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.uniqCode, title: 'Новая запись' },
      ],
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((elem) => elem.code !== code),
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected
          if (item.selected) {
            if (item.countSelected) item.countSelected += 1
            else item.countSelected = 1
          } else item.countSelected += 0
        } else {
          item.selected = false
        }

        return item
      }),
    })
  }
}

export default Store
