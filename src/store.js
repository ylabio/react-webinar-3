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
   * Переключение состояния модального окна корзины
   */
  toggleCartModal() {
    this.setState({
      ...this.state,
      isCartModalOpen: !this.state.isCartModalOpen,
    });
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
   * @param {number} code Код добавляемого товара
   */
  addToCart(code) {
    const cartList = [].concat(this.state.cartList ?? []);
    const selectedProduct = this.state.list.find(
      (product) => product.code === code
    );
    if (selectedProduct) {
      const existingCartItem = cartList.find((item) => item.code === code);
      if (existingCartItem) {
        existingCartItem.count++;
      } else {
        cartList.push({ ...selectedProduct, count: 1 });
      }
    }

    this.setState({
      ...this.state,
      cartList,
    });
  }
  /**
   * Удаление записи из корзины по коду
   * @param {number} code Код удаляемого товара
   */
  onDeleteCartItem(code) {
    const updatedCartList = this.state.cartList
      .map((item) => {
        if (item.code === code) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
      .filter((item) => item.count > 0);

    this.setState({
      ...this.state,
      cartList: updatedCartList,
    });
  }
}

export default Store;
