/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
		...initState,
		cart: [],
		isCartOpen: false
	  };
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
   * Добавление товара в корзину 
   * @param item {Object}
   */
  addToCart(item) {
	const cartItem = this.state.cart.find(el=>el.code === item.code)
	
	if (cartItem) {
		// Если товар уже есть в корзине
		cartItem.count+=1
		this.setState({
		  ...this.state,
		  cart: [...this.state.cart]
		})
	} else {
		// если товара нет в корзине
		this.setState({
		  ...this.state,
		  cart: [...this.state.cart, {...item, count: 1}]
		})
	}
  };

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  deleteFromCart(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(el => el.code !== item.code)
    })
  };

  /**
   * Открыть или закрыть модалку корзины
   */
  toggleOpenCloseCart() {
    this.setState({
      ...this.state,
      isCartOpen: !this.state.isCartOpen
    })
  };
}

export default Store;