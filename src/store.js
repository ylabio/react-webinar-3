class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: {} // Initialize empty cart
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
    for (const listener of this.listeners) listener();
  }

  addToCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: (this.state.cart[code] || 0) + 1
      }
    });
  }

  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];
    this.setState({
      ...this.state,
      cart: newCart
    });
  }
}

export default Store;
