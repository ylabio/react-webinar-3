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
   * Добавление товара
   */
  addItemIntoCart(item) {
    const cartStore = this.state.productsIntoCart;

    const indexItemIntoCart = cartStore.findIndex(
      (itemInto) => itemInto.code === item.code
    );

    let changedProductsInCart = [];

    if (indexItemIntoCart !== -1) {
      changedProductsInCart = cartStore.map((product) =>
        product.code === item.code
          ? {
              ...product,
              amountIntoCart: product.amountIntoCart + 1,
            }
          : product
      );
    } else {
      changedProductsInCart = [...cartStore, { ...item, amountIntoCart: 1 }];
    }

    this.setState({
      ...this.state,
      productsIntoCart: changedProductsInCart,
    });
  }

  /**
   * Удаление товара
   * @param code
   */
  deleteItemIntoCart(code) {
    const cartStore = this.state.productsIntoCart;
    const modifiedArr = cartStore.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      productsIntoCart: modifiedArr,
    });
  }
}

export default Store;
