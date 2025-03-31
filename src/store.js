class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: {},
      cartSummary: {
        uniqueItemsCount: 0,  // Количество уникальных товаров
        totalQuantity: 0,     // Общее количество товаров (всех штук)
        totalAmount: 0         // Общая сумма
      }
    };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.listeners.forEach(listener => listener());
  }

  // Приватный метод для расчета итогов
  #calculateCartSummary(cart) {
    const cartItems = Object.entries(cart).map(([code, quantity]) => {
      const item = this.state.list.find(item => item.code === Number(code));
      return { ...item, quantity };
    });

    return {
      uniqueItemsCount: cartItems.length, // Количество уникальных товаров
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
  }

  addToCart(code) {
    const newCart = {
      ...this.state.cart,
      [code]: (this.state.cart[code] || 0) + 1
    };

    this.setState({
      ...this.state,
      cart: newCart,
      cartSummary: this.#calculateCartSummary(newCart)
    });
  }

  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];

    this.setState({
      ...this.state,
      cart: newCart,
      cartSummary: this.#calculateCartSummary(newCart)
    });
  }
}

export default Store;
