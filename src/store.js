/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, totalPrice: 0 };
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
  addItem(code) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === code) {
            return {
              ...cartItem,
              count: cartItem.count + 1
            };
          } else {
            return cartItem;
          }
        }),
        totalPrice: this.state.totalPrice + existingItem.price
      });
    } else {
      const itemToAdd = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {
          code: itemToAdd.code,
          title: itemToAdd.title,
          price: itemToAdd.price,
          count: 1
        }],
        totalPrice: this.state.totalPrice + itemToAdd.price // Увеличение общей суммы
      });
    }
  };

  /**
   * Удаление товаро из коризны
   * @param code
   */
  deleteItem(code) {
    const itemToDelete = this.state.cart.find(item => item.code === code);
    const priceToRemove = itemToDelete.price * itemToDelete.count; // Полная цена удаляемого товара
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalPrice: this.state.totalPrice - priceToRemove // Уменьшение общей суммы
    })
  };

  /**
   * Открытие/закртие корзины
   */
  changeCartIsOpen() {
    this.setState({
      ...this.state,
      cartIsOpen: !this.state.cartIsOpen,
    })
  }
}

export default Store;
