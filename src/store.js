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
   * Добавление товара
   * @param code {number} Идентификатор товара
   */
  addItem(code) {
    const existingItem = this.state.cart?.some(item => item.code === code);
    
    const cart = existingItem ? this.state.cart.map(item => (item.code === code)
      ? {...item, amount: item.amount + 1} 
      : item
    ) : [
      ...(this.state.cart ?? []), 
      {
        ...this.state.list.find(item => item.code === code),
        amount: 1,
      }
    ];

    this.setState({
      ...this.state,
      cart,
      totalAmount: cart.length,
      totalSum: cart.reduce((acc, curr) => acc + curr.price * curr.amount, 0)
    });
  };

  /**
   * Удаление товара
   * @param code {number} Идентификатор товара
   */
  deleteItem(code) {
    const newCart = this.state.cart.reduce((acc, curr) => {
      if (curr.code !== code) {
        acc.cart.push(curr);
        acc.totalSum += curr.price * curr.amount;
      }
      return acc;
    }, {cart: [], totalSum: 0})

    this.setState({
      ...this.state,
      ...newCart,
      totalAmount: this.state.totalAmount - 1,
    })
  };
}

export default Store;
