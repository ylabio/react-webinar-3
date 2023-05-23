import { recalculationAmount } from './utils'

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
   * Добавление позиции в корзину
   * @param item {Object}
   */

  onAddItemCart(item) {
    // Проверяем наличие этого товара в корзине, если да то прибавляем {item.quantity + 1}
    const isAvailable = this.state.cart.some((elem) => elem.code === item.code)

    if (isAvailable) {
      return this.setState({
        ...this.state,
        cart: this.state.cart.map((elem) => {
          if (elem.code === item.code) {
            return { ...item, quantity: elem.quantity + 1 }
          }
          return elem
        }),
        // Увеличиваем сумму {amount}
        resultCart: {
          ...this.state.resultCart,
          amount: this.state.resultCart.amount + item.price,
        },
      })
    }

    // Если товара нет, то добавляем в список
    return this.setState({
      ...this.state,
      cart: [...this.state.cart, { ...item, quantity: 1 }],
      // Увеличиваем сумму {amount} и количество {quantity}
      resultCart: {
        amount: this.state.resultCart.amount + item.price,
        quantity: this.state.cart.length + 1,
      },
    })
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  onDeleteItemCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter((item) => item.code !== code),
    })

    this.setState({
      ...this.state,
      // Пересчет корзины
      resultCart: {
        amount: recalculationAmount(this.state.cart),
        quantity: this.state.cart.length,
      },
    })
  }
}

export default Store
