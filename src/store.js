import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      cartTotal: 0,
      cartItemsCount: 0,
      cartSum: 0,
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
   * Добавление 
   * @param code {Object}
   */
  addToCart(code) {       
    const existingItem = this.state.cart.find(item => item.code === code);
    const product = this.state.list.find(p => p.code === code);

    let newCart, newTotal, newCount, newSum;

    if (existingItem) {
      newCart = this.state.cart.map(item =>
        item.code === code
          ? {...item, quantity: item.quantity + 1}
          : item
      );

      newTotal = this.state.cartTotal;
      newCount = this.state.cartItemsCount + 1;
      newSum = this.state.cartSum + product.price;
    } else {
      newCart = [...this.state.cart, {code, quantity: 1}];
      newTotal = this.state.cartTotal + 1;
      newCount = this.state.cartItemsCount + 1;
      newSum = this.state.cartSum + product.price;
    }

      this.setState({
        ...this.state,
        cart: newCart,
        cartTotal: newTotal,
        cartItemsCount: newCount,
        cartSum: newSum,
      });
    }

  removeFromCart(code) {
    const itemToRemove = this.state.cart.find(item => item.code === code);
    const product = this.state.list.find(p => p.code === code);
    
    if (!itemToRemove) return;
    
    const newCart = this.state.cart.filter(item => item.code !== code);
    const newTotal = this.state.cartTotal - 1;
    const newCount = this.state.cartItemsCount - itemToRemove.quantity;
    const newSum = this.state.cartSum - (product.price * itemToRemove.quantity);
    
    this.setState({
      ...this.state,
      cart: newCart,
      cartTotal: newTotal,
      cartItemsCount: newCount,
      cartSum: newSum
    });
  }
}

export default Store;
