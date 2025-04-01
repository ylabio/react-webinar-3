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
   * Добавление товара в корзину
   * @param code 
   */
  addCartItem(code) {
    const itemInCart = this.state.cart.find(item => item.code === code);

    if (itemInCart) {
      const updatedCart = this.state.cart.map(item => {
        if (item.code === code) {
          this.state.totalPrice = this.state.totalPrice + item.price;
          
          return {
            ...item,
            count: item.count + 1 || 1
          };
        }
        return item;
      });

      this.setState({
        ...this.state,
        cart: updatedCart,
        uniqueCount: this.state.cart.length
      })
    } else {
      const newItem = this.state.list.find(item => item.code === code);

      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          { ...newItem, count: 1 }
        ],
        totalPrice: (this.state.totalPrice || 0) + newItem.price,
        uniqueCount: (this.state.cart.length || 0) + 1
      })
    }
  };

  /**
   * Удаление товара из корзины
   * @param code 
   */
  deleteCartItem(code) {
    const deletedItem = this.state.cart.find(item => item.code === code);

    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalPrice: this.state.totalPrice - deletedItem.price * deletedItem.count,
      uniqueCount: this.state.cart.length - 1,
    });
  };
};

export default Store;