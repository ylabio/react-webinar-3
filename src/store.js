/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      cart: [],
      isOpened: false,
      totalQuantity: 0,
      totalAmount: 0,
      ...initState,
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
   * Добавляет товар в корзину или увеличивает его количество, если товар уже есть
   * @param {number|string} code - Уникальный код товара из списка продуктов
   */
  addToCart(code) {
    const { cart, list } = this.state;
    const item = list.find((elem) => elem.code === code);
    const existingItemIndex = cart.findIndex(
      (elem) => elem.code === code
    );

    let newCart;
    if (existingItemIndex >= 0) {
      newCart = cart.map((elem, index) => 
        index === existingItemIndex
          ? { ...elem, quantity: elem.quantity + 1 }
          : elem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    this.setState({
      ...this.state,
      cart: newCart,
    });

    this.updateCart(newCart);
  }

  /**
   * Полностью удаляет товар из корзины по его коду
   * @param {number|string} code - Код товара для удаления
   */
  removeFromCart(code) {
    const { cart } = this.state;
    const newCart = cart.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cart: newCart,
    });

    this.updateCart(newCart);
  }

  /**
   * Переключает состояние видимости модального окна корзины (открыто/закрыто)
   */
  toggleCartModal() {
    const { isOpened } = this.state;
    const newIsOpened = !isOpened;
    this.setState({
      ...this.state,
      isOpened: newIsOpened,
    });
  }

  /**
   * Внутренний метод для пересчета количества уникальных товаров
   * и общей стоимости корзины
   * @private
   * @param {Array} newCart - Новое состояние корзины
   */
  updateCart(newCart) {
    const totalQuantity = newCart.length;
    const totalAmount = newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.setState({
      ...this.state,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
    });
  }
}

export default Store;
