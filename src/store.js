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
    const cartList = this.state.cartList ? [...this.state.cartList] : [];
    const selectedProduct = this.state.list.find((product) => product.code === code);
    
    if (selectedProduct) {
      const existingCartItemIndex = cartList.findIndex((item) => item.code === code);

      if (existingCartItemIndex !== -1) {
        cartList[existingCartItemIndex].count++;
      } else {
        cartList.push({ ...selectedProduct, count: 1 });
      }

      const cartTotalPrice = cartList.reduce((total, item) => total + item.price * item.count, 0);
      const  cartItemCount = cartList.length;

      this.setState({
        ...this.state,
        cartList,
        cartTotalPrice,
        cartItemCount,
      });
    }
}

  /**
   * Удаление товара из корзины
   * @param {number} code Код удаляемого товара
   */
  onDeleteCartItem(code) {
    const updatedCartList = this.state.cartList.filter((item) => item.code !== code);

    const cartTotalPrice = updatedCartList.reduce((total, item) => total + item.price * item.count, 0);
    const cartItemCount = updatedCartList.reduce((total, item) => total + item.count, 0);

    this.setState({
      ...this.state,
      cartList: updatedCartList,
      cartTotalPrice,
      cartItemCount,
    });
  }
}

export default Store;
