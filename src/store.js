/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      totalSum: 0,
      itemsCount: 0,
    }
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
   * Пересчет суммы и количества товаров в корзине
   * @param {Array} cart
   */
  recalculateCart(cart) {
    const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemsCount = cart.length

    return {
      totalSum,
      itemsCount,
    }
  }

  /**
   * Добавление товара в корзину
   * @param {*} code
   */
  addToCart(code) {
    const item = this.state.list.find((item) => item.code === code)
    if (!item) return

    const cart = [...this.state.cart]
    const existingCartItem = cart.find((cartItem) => cartItem.code === code)

    // Если в корзине
    if (existingCartItem) {
      existingCartItem.quantity += 1
    } else {
      cart.push({
        code: item.code,
        title: item.title,
        price: item.price,
        quantity: 1,
      })
    }

    // Пересчитываем сумму и количество
    const { totalSum, itemsCount } = this.recalculateCart(cart)

    this.setState({
      ...this.state,
      cart,
      totalSum,
      itemsCount,
    })
  }

  /**
   * Удаление товара из корзины
   * @param {*} code
   */
  removeFromCart(code) {
    const cart = this.state.cart.filter((item) => item.code !== code)

    // Пересчитываем сумму и количество
    const { totalSum, itemsCount } = this.recalculateCart(cart)

    this.setState({
      ...this.state,
      cart,
      totalSum,
      itemsCount,
    })
  }
};

export default Store;