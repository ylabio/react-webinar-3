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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
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
   * Переходим в корзину
   */
  openCart() {
    this.setState({
      ...this.state,
      isCart: true,
    });
  }
  /**
   * закрываем корзины
   */
  closeCart() {
    this.setState({
      ...this.state,
      isCart: false,
    });
  }
  /**
   * добавление продукта в корзину
   * @param product
   */
  addProduct(product) {
    // ищем index продукта
    const existingProductIndex = this.state.cart.products.findIndex(
      (item) => item.code === product.code
    );

    // если товар есть в корзине
    if (existingProductIndex !== -1) {
      //  увеличим count на 1
      const updatedProducts = [...this.state.cart.products];
      updatedProducts[existingProductIndex].count += 1;

      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: updatedProducts,
          totalPrice: this.state.cart.totalPrice + product.price,
        },
      });
    } else {
      // Если товара нет в корзине, добавляем его с начальным количеством 1
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: [
            ...this.state.cart.products,
            {
              ...product,
              count: 1,
            },
          ],
          totalPrice: this.state.cart.totalPrice + product.price,
        },
      });
    }
  }

  /**
   * удаление продукта из корзины
   * @param product
   */
  deleteProduct(product) {
    const existingProductIndex = this.state.cart.products.findIndex(
      (item) => item.code === product.code
    );
    if (existingProductIndex !== -1) {
      const price = this.state.cart.products[existingProductIndex].price;
      const count = this.state.cart.products[existingProductIndex].count;
      const amountPrice = price * count;
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          products: this.state.cart.products.filter(
            (item) => item.code !== product.code
          ),
          totalPrice: this.state.cart.totalPrice - amountPrice,
        },
      });
    }
  }
}

export default Store;
