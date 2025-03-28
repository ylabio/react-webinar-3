/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    if (!this.state.cart) {
      this.state.cart = [];
    }

    if (this.state.isCartOpen === undefined) {
      this.state.isCartOpen = false;
    }
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
   * Добавление товара в корзину
   * @param code Код товара
   */
  addToCart(code) {
    const product = this.state.list.find(item => item.code === code);
    if (!product) return;

    const cartItemIndex = this.state.cart.findIndex(item => item.code === code);

    if (cartItemIndex >= 0) {
      // Товар уже есть в корзине, увеличиваем количество
      const updatedCart = [...this.state.cart];
      updatedCart[cartItemIndex] = {
        ...updatedCart[cartItemIndex],
        quantity: updatedCart[cartItemIndex].quantity + 1,
      };

      this.setState({
        ...this.state,
        cart: updatedCart,
      });
    } else {
      // Добавляем новый товар в корзину
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1 }],
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code Код товара
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  /**
   * Открытие/закрытие корзины
   * @param isOpen Флаг открытия
   */
  toggleCart(isOpen) {
    this.setState({
      ...this.state,
      isCartOpen: isOpen !== undefined ? isOpen : !this.state.isCartOpen,
    });
  }

  /**
   * Получение общей суммы товаров в корзине
   * @returns {number}
   */

  getCartTotal() {
    return this.state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /**
   * Получение общего количества товаров в корзине
   * @returns {number}
   */
  getCartUniqueCount() {
    return this.state.cart.length;
  }
}

export default Store;
