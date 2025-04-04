class CartManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  // Получение состояния корзины
  getCartState() {
    const cartList = this.stateManager.getState().cartList || [];
    const sizeCart = cartList.length;
    const total = cartList.reduce((acc, item) => acc + (item.total || 0), 0);
    return { total, sizeCart, cartList };
  }

  // Добавление товара в корзину (с проверкой на уникальность)
  addCartProductCard(code) {
    const list = this.stateManager.getState().list;
    const cartList = this.stateManager.getState().cartList || [];

    // Ищем товар в списке товаров
    const item = list.find(item => item._id === code);

    if (item) {
      // Проверяем, есть ли уже этот товар в корзине
      const existingItemIndex = cartList.findIndex(cartItem => cartItem._id === code);

      if (existingItemIndex >= 0) {
        // Если товар уже есть в корзине, обновляем его количество и общую стоимость
        const updatedCartList = cartList.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return this.updateItem(cartItem);  // Обновляем количество и цену
          }
          return cartItem;
        });

        // Обновляем корзину с новым состоянием
        this.stateManager.setState({
          ...this.stateManager.getState(),
          cartList: updatedCartList,
        });
      } else {
        // Если товара нет в корзине, добавляем его как новый
        const updatedItem = this.updateItem(item);
        this.stateManager.setState({
          ...this.stateManager.getState(),
          cartList: [...cartList, updatedItem],
        });
      }
    }
  }

  // Удаление товара из корзины
  clearCartProductCard(code) {
    const cartList = this.stateManager.getState().cartList || [];
    const updatedCartList = cartList.filter(item => item._id !== code);

    this.stateManager.setState({
      ...this.stateManager.getState(),
      cartList: updatedCartList,
    });
  }

  // Обновление товара (количество и стоимость)
  updateItem(item) {
    return {
      ...item,
      count: item.count ? item.count + 1 : 1,
      total: item.total ? item.total + item.price : item.price,
    };
  }
}



export {CartManager}
