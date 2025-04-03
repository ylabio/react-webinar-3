class CartManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  getCartState() {
    const list = this.stateManager.getState().list;
    const cartList = list.filter(item => item.count);
    const sizeCart = cartList.length;
    const total = cartList.reduce((acc, item) => acc + (item.total || 0), 0);
    return { total, sizeCart, cartList };
  }

  clearCartProductCard(code) {
    const list = this.stateManager.getState().list;
    const clonedList = list.map(item =>
      item._id === code
        ? { ...item, count: 0, total: 0 }
        : item
    );

    this.stateManager.setState({
      ...this.stateManager.getState(),
      list: clonedList,
    });
  }

  addCartProductCard(code) {
    const list = this.stateManager.getState().list;
    const updatedList = list.map(item => {
      if (item._id === code) {
        return this.updateItem(item);
      }
      return item;
    });

    this.stateManager.setState({
      ...this.stateManager.getState(),
      list: updatedList,
    });
  }

  updateItem(item) {
    return {
      ...item,
      count: item.count ? item.count + 1 : 1,
      total: item.total ? item.total + item.price : item.price,
    };
  }
}

export {CartManager}
