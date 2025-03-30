/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      isCartOpen: false,
      cartTotal: 0,
      cartUniqueCount: 0,
    };
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
   * Добавление товара в корзину
   * @param code Код товара
   */
  addToCart(code) {
    const product = this.state.list.find(item => item.code === code);
    if (!product) return;

    const cartItemIndex = this.state.cart.findIndex(item => item.code === code);

    let updatedCart = [...this.state.cart];

    if (cartItemIndex >= 0) {
      // Товар уже есть в корзине, увеличиваем количество
      updatedCart[cartItemIndex] = {
        ...updatedCart[cartItemIndex],
        quantity: updatedCart[cartItemIndex].quantity + 1,
      };
    } else {
      updatedCart = [...this.state.cart, { ...product, quantity: 1 }];
    }

    const cartTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      cart: updatedCart,
      cartTotal,
      cartUniqueCount: updatedCart.length,
    });
  }

  /**
   * Удаление товара из корзины
   * @param code Код товара
   */
  removeFromCart(code) {
    const updatedCart = this.state.cart.filter(item => item.code !== code);
    const cartTotal = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      cart: updatedCart,
      cartTotal,
      cartUniqueCount: updatedCart.length,
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
}

export default Store;
