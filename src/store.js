import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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

  getProductsQuantity(productsInCart) {
    return productsInCart.length
  }

  getProductsTotalAmount(productsInCart) {
    return productsInCart.reduce((sum, cartItem) => sum += cartItem.amount * cartItem.price, 0)
  }

  /**
   * Добавление товара
   * * @param item
  */
  addToCart(item) {
    const isItemInCart = this.state.productsInCart.find(cartItem => cartItem.code === item.code);

    let newProductsInCart = []

    if (isItemInCart) {
      newProductsInCart = this.state.productsInCart.map(cartItem => {
        if (cartItem.code === item.code) {
          return {
            ...cartItem,
            amount: cartItem.amount + 1
          }
        }
        
        return cartItem;
      })
    } else {
      newProductsInCart = [...this.state.productsInCart, {...item, amount: 1}]
    }

    this.setState({
      ...this.state,
      productsInCart: newProductsInCart,
      productsQuantity: this.getProductsQuantity(newProductsInCart),
      productsTotalAmount: this.getProductsTotalAmount(newProductsInCart),
    })
  };

  /**
   * Удаление записи по коду
   * @param item
   */
  deleteItem(item) {
    let newProductsInCart = this.state.productsInCart.filter(cartItem => cartItem.code !== item.code)
    this.setState({
      ...this.state,
      productsInCart: newProductsInCart,
      productsQuantity: this.getProductsQuantity(newProductsInCart),
      productsTotalAmount: this.getProductsTotalAmount(newProductsInCart),
    })
  };
}

export default Store;
