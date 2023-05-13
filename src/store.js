/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState
    this.listeners = [] // Слушатели изменений состояния
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
    // Создание уникального id
    let id = 0
    do {
      id = Math.round(Math.random() * 100)
    } while (this.state.list.some((item) => item.code === id)) // Проверка на наличие id в имеющемся списке, если есть то генерируем заново

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: id, title: 'Новая запись', call: 0 }],
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
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
        if (item.code === code && !item.selected) {
          // Проверяем id и выделен ли элемент
          item.selected = true
          item.call += 1 // увеличиваем счетчик
        } else item.selected = false

        return item
      }),
    })
  }
}

export default Store
