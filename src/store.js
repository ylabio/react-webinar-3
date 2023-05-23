class Store {
  constructor(initState = {list: [], cart: []}) {
  this.state = initState;
  if (!Object.hasOwn(initState, 'cart')) {
    this.state.cart = [];
  }
  this.listeners = []; // Слушатели изменений состояния
}

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  Delete_item(code) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart.filter((item) => item.code !== code)]
    });
  }

  addToCart(code) {
    const newItem = this.state.list.find(item => item.code === code);
    const Item_exists = this.state.cart.find((item) => item.code === newItem.code);
    if(Item_exists) {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.filter((item) => item.code !== newItem.code),
          {...Item_exists, quantity: Item_exists.quantity + 1}
        ]
      });
    } else {
      this.setState({...this.state, cart: [...this.state.cart, {...newItem, quantity: 1}]});
    }
  };

}

export default Store;