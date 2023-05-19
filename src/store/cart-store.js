import Store from './store';

class CartStore extends Store {
  addItem(itemToAdd) {
    let isNew = true;

    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart.map((item) => {
          if (item.code === itemToAdd.code) {
            isNew = false;
            return { ...item, cnt: ++item.cnt };
          } else {
            return item;
          }
        }),
      ],

      sum: this.state.sum + itemToAdd.price,
      cnt: isNew ? ++this.state.cnt : this.state.cnt,
    });

    if (isNew) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...itemToAdd, cnt: 1 }],
      });
    }
  }

  deleteItem(itemToDelete) {
    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart.filter((item) => item.code != itemToDelete.code),
      ],
      cnt: this.state.cnt - 1,
      sum: this.state.sum - itemToDelete.cnt * itemToDelete.price,
    });
  }
}

export default CartStore;
