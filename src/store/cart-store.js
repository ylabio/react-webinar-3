import Store from './store';

class CartStore extends Store {
  addItem(itemToAdd) {
    let isNew = true;
    this.setState([
      ...this.state.map((item) => {
        if (item.code === itemToAdd.code) {
          isNew = false;
          return { ...item, cnt: ++item.cnt };
        } else {
          return item;
        }
      }),
    ]);

    if (isNew) {
      this.setState([...this.state, { ...itemToAdd, cnt: 1 }]);
    }
  }

  deleteItem(itemToDelete) {
    this.setState([
      ...this.state.filter((item) => item.code != itemToDelete.code),
    ]);
  }

  getItemsCnt() {
    return this.state.length;
  }

  getCartSum() {
    return this.state.reduce((prev, current) => {
      prev += current.cnt * current.price;

      return prev;
    }, 0);
  }
}

export default CartStore;
