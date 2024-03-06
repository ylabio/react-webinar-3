/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
		...initState,
		cart: [],
		uniqueItemsCount: 0,
		totalPrice: 0,
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
  addToCart(code) {
	const item = this.state.list.find(el=>el.code === code)
	const cartItem = this.state.cart.find(el=>el.code === code)
	
	if (cartItem) {
		// Если товар уже есть в корзине
		this.setState({
		  ...this.state,
		  cart: this.state.cart.map(el=>el.code === code ? {...el, count: el.count + 1} : el)
		})
	} else {
		// если товара нет в корзине
		this.setState({
		  ...this.state,
		  cart: [...this.state.cart, {...item, count: 1}]
		})
	}
	this.recountTotalPrice()
  };

  /**
   * Удаление товара из корзины
   * @param item {Object}
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(el => el.code !== code)
    })
		this.recountTotalPrice()
  };

	/**
   * Подсчет кол-ва товаров и общей цены
   */
  recountTotalPrice() {
		const count = this.state.cart.length;
    const price = count ? this.state.cart.reduce((total, item) => total + item.price * item.count, 0) : 0;

		this.setState({
			...this.state,
			uniqueItemsCount: count,
			totalPrice: price
		})
  }

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