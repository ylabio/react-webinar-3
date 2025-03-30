class Store {
  constructor(initState = {}) {
    this.state = initState;
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
      list: this.state.list.map(item =>
        item.code === code ? { ...item, inCart: true, count: (item.count || 0) + 1 } : item,
      ),
    });
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item =>
        item.code === code ? { ...item, inCart: false, count: 0 } : item,
      ),
    });
  }

  getCartItems() {
    return this.state.list.filter(item => item.inCart);
  }

  getCartTotalAmount() {
    return this.getCartItems().reduce((sum, item) => sum + item.price * item.count, 0);
  }

  getCartTotalQuantity() {
    return this.getCartItems().length;
  }
}

export default Store;
