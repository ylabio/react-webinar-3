import { generateCode } from './utils'

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState
    this.listeners = [] // Слушатели изменений состояния
    this.totalPrice = 0 // общая сумма товаров
    this.totalCount = 0 // общее количество товаров
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
   * Добавление товара в корзину
   */
  addProduct(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          if (item?.count > 0) {
            item.count += 1
          } else {
            item.count = 1
          }
          return item
        }
        return item
      }),
    })

    this.setTotalCountAndPrice()
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: 'Новая запись' },
      ],
    })
  }

  /**
   * Считает общее количество и общую сумму товаров
   * @param {void}
   * @returns {void}
   */
  setTotalCountAndPrice() {
    const { totalPrice, totalCount } = this.state.list.reduce(
      (acc, el) => {
        if (el?.count) {
          acc.totalPrice += Number(el.price) * el.count
          acc.totalCount += el.count
        }
        return acc
      },
      { totalPrice: 0, totalCount: 0 },
    )

    this.totalCount = totalCount
    this.totalPrice = totalPrice
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteProduct(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.count = 0
          return item
        }
        return item
      }),
    })

    this.setTotalCountAndPrice()
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
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          }
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item
      }),
    })
  }
}

export default Store
