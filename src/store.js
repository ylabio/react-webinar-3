import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: []
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
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item =>
          item.code === code
            ? {...item, quantity: item.quantity + 1}
            : item
        )
      });
    }
    else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code, quantity: 1}]
      });
    }
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }  
}

export default Store;
