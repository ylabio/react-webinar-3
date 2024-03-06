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
   * @param code
   */
  addProduct(code) {
    const products = this.state.cart.products;
    const cart = this.state.cart;

    // ищем index продукта
    const existingProductIndex = products.findIndex(
      (item) => item.code === code
    );
    // если товар есть в корзине
    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];

      //  увеличим count на 1
      updatedProducts[existingProductIndex].count += 1;
      this.setState({
        ...this.state,
        cart: {
          ...cart,
          products: updatedProducts,
          totalPrice: cart.totalPrice + products[existingProductIndex].price,
        },
      });
    } else {
      const newProductIndex = this.state.list.findIndex(
        (item) => item.code === code
      );
      const newProduct = this.state.list[newProductIndex];

      // Если товара нет в корзине, добавляем его с начальным количеством 1
      this.setState({
        ...this.state,
        cart: {
          ...cart,
          products: [
            ...products,
            {
              ...newProduct,
              count: 1,
            },
          ],
          totalPrice: cart.totalPrice + newProduct.price,
        },
      });
    }
  }

  /**
   * удаление продукта из корзины
   * @param code
   */
  deleteProduct(code) {
    const existingProductIndex = this.state.cart.products.findIndex(
      (item) => item.code === code
    );

    if (existingProductIndex !== -1) {
      const price = this.state.cart.products[existingProductIndex].price;
      const count = this.state.cart.products[existingProductIndex].count;
      const cart = this.state.cart;

      const amountPrice = price * count;

      this.setState({
        ...this.state,
        cart: {
          ...cart,
          products: cart.products.filter((item) => item.code !== code),
          totalPrice: cart.totalPrice - amountPrice,
        },
      });
    }
  }
}

export default Store;
