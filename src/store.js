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

  /**
   * Добавление товара в корзину по его коду
   * @param code {number}
   */
  addInCart(code) {
    const currentProduct = this.state.list.find((item) => item.code === code);
    const currentProductAmount = this.state.cart.products.find((item) => item.code === code)?.amount || 0;

    // если такого товара в корзине еще не было
    if (currentProductAmount === 0) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [...this.state.cart.products, {...currentProduct, amount: currentProductAmount + 1}],
          totalPrice: this.state.cart.totalPrice + currentProduct.price,
          productsAmount: this.state.cart.productsAmount + 1
        }
      });
    } else {
      // Если такой товар уже есть в корзине
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [
            ...this.state.cart.products.filter((item) => item.code !== code),
            {...currentProduct, amount: currentProductAmount + 1}
          ],
          totalPrice: this.state.cart.totalPrice + currentProduct.price
        }
      });
    }
  }

  /**
   * Удаление всего типа товаров из корзины по его коду
   * @param code {number}
   */
  removeFromCart(code) {
    const newProducts = this.state.cart.products.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: [...newProducts],
        productsAmount: newProducts.length,
        totalPrice: newProducts.reduce((accum, item) => accum + item.price * item.amount, 0),
      }
    });
  }
}

export default Store;
