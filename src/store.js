/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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

  addProduct(code) {
    const productToAdd = this.state.list.find(item => item.code === code);
    const isUniqueProduct = !this.state.productList.some(item => item.code === productToAdd.code);
    const newProductCount = isUniqueProduct
      ? this.state.productCount + 1
      : this.state.productCount;
    if (productToAdd) {
      this.setState({
        ...this.state,
        productList: [...this.state.productList, productToAdd],
        productCount: newProductCount,
        finalPrice: this.state.finalPrice + productToAdd.price
      });
    }
  }

  deleteProduct(code) {
    const newProductList = this.state.productList.filter(item => item.code !== code);

    const newProductCount = this.state.productCount - 1;
    const newFinalPrice = newProductList.reduce((total, item) => total + item.price, 0);

    this.setState({
      ...this.state,
      productList: newProductList,
      productCount: newProductCount,
      finalPrice: newFinalPrice
    });
  }
}

export default Store;
