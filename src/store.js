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
   * Добавление объекта товара в корзину
   * @param code {Number}
   */
  addItemToCart(code) {
    const itemInCart = this.state.cart.find(cartItem => cartItem.code === code);
    const originalItem = this.state.list.find(listItem => listItem.code === code);

    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === code) {

            return {
              ...cartItem,
              amount: cartItem.amount + 1
            }
          }
          
          return cartItem;
        })
      })
    } else {
      if (originalItem) {
        this.setState({
          ...this.state,
          cart: [...this.state.cart, {...originalItem, amount: 1}]
        })
      }
    }
  }

  /**
   * Удаление товара из корзины по коду
   * @param code {Number}
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список корзины, в котором не будет удаляемого товара
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  /**
   * Открытие модального окна
   */
  openModal() {
    this.setState({
      ...this.state,
      isModalOpen: true
    })
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
    this.setState({
      ...this.state,
      isModalOpen: false
    })
  }
}

export default Store;
