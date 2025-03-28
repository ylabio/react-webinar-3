
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      // cart: {},
      cart: [],
      isModalOpen: false,
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
    this.listeners.forEach(listener => listener());
  }

  /**
  * Добавление товара в корзину (обновленная версия для массива)
* @param code {Number} Код товара
* @param quantity {Number} Количество (по умолчанию 1)
*/
addToCart(code, quantity = 1) {
  const item = this.state.list.find(item => item.code === code);
  if (!item) return;

  const existingItemIndex = this.state.cart.findIndex(cartItem => cartItem.code === code);

  let newCart;
  if (existingItemIndex >= 0) {
    newCart = [...this.state.cart];
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: newCart[existingItemIndex].quantity + quantity,
    };
  } else {
    newCart = [...this.state.cart, { ...item, quantity }];
  }

  this.setState({
    ...this.state,
    cart: newCart,
  });
}

/**
   * Удаление товара из корзины
   * @param code {Number} Код товара
   */
removeFromCart(code) {
  const newCart = this.state.cart.filter(item => item.code !== code);
  this.setState({
    ...this.state,
    cart: newCart,
  });
}

  /**
   * Переключение видимости модалки корзины
   */
  toggleModal() {
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen
    });
  }
}

export default Store;
