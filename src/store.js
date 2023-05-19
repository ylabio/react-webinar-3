
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
   * Добавление товара в корзину
   * @param code
   */
  addProductInBasket(code) {
    const currentProduct = this.state.list.find(
      (product) => product.code === code
    );
    this.setState({
      ...this.state,
      basket: [
        ...this.state.basket,
        { ...currentProduct, count: ++currentProduct.count },
      ],
    });
  }

  /**
   * Изменение количества товара
   * @param code
   */
  changeCount(code) {
    const indexItem = this.state.basket.findIndex(
      (product) => product.code === code
    );
    const copyBasket = [...this.state.basket];
    copyBasket[indexItem] = {
      ...copyBasket[indexItem],
      count: ++copyBasket[indexItem].count,
    };
    this.setState({
      ...this.state,
      basket: [...copyBasket],
    });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code),
    })
  }

  /**
   * Подсчёт количества товара и общей суммы в корзине
   *
   */
  totalCount() {
    let totalQuantity = 0;
    let totalAmount = 0;
    this.state.basket.forEach((item) => {
      totalQuantity += item.count
      totalAmount += item.price * item.count
    });
    this.setState({
      ...this.state,
      total: [
        { total: totalQuantity },
        { totalPrice: totalAmount },
      ],
    })
  }
}

export default Store
