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
   * @param item {Object}
   */
  addItemToCart(item) {
    // Проверяем наличие товара в корзине
    const existingItem = this.state.cart.find(cartItem => cartItem.code === item.code);

    // Если есть, то увеличиваем количество на 1
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === item.code) {

            return {
              ...cartItem,
              amount: cartItem.amount + 1
            }
          }
          
          return cartItem;
        })
      })

    // Иначе добавляем новый товар
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, amount: 1}]
      })
    }

  };

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
