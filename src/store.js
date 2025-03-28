import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: {}, // { code: quantity }
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


  addToCart(code) {
    const newCart = { ...this.state.cart };
    newCart[code] = (newCart[code] || 0) + 1;
  
    const newList = this.state.list.map(item =>
      item.code === code ? { ...item, quantity: newCart[code] } : item
    );
  
    this.setState({
      ...this.state,
      cart: newCart,
      list: newList,
    });
  }
  
  

  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];
  
    const newList = this.state.list.map(item =>
      item.code === code ? { ...item, inCart: false, quantity: 0 } : item
    );
  
    this.setState({
      ...this.state,
      cart: newCart,
      list: newList,
    });
  }
  
  getCartTotal() {
    if (!this.state.list) return 0; 
  
    return Object.entries(this.state.cart).reduce((total, [code, quantity]) => {
      const item = this.state.list.find(item => item.code === Number(code));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  }
  getCartItemsLength() {
    return Object.values(this.state.cart).reduce((total, quantity) => total + quantity, 0);
  }
}
  




export default Store;
