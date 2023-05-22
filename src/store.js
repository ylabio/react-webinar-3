import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
        cart: [],
        total: 0
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

  // calculateTotal() {
  //   let total = 0;
  //   this.state.cart.forEach(item => {
  //     total += item.price * item.quantity;
  //   });
  //   return total;
  // }

  // updateTotal() {
  //   const total = this.calculateTotal();

  //   this.setState({
  //     ...this.state,
  //     total: total
  //   });

  // }

  addToCart(code) {
    const selectedProduct = this.state.list.find(item => item.code === code);
    if (selectedProduct) {
      const cartItem = this.state.cart.find(item => item.code === code);
      if (cartItem) {
        this.setState({
          ...this.state,
          cart: this.state.cart.map(item => {
            if (item.code === code) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            }
            return item;
          }),
          total: this.state.cart.forEach(item => {
            total += item.price * item.quantity;
            return total;
          })
        });
      } else {
        const newCartItem = {
          ...selectedProduct,
          quantity: 1
        };
        this.setState({
          ...this.state,
          cart: [...this.state.cart, newCartItem],
          total: this.state.cart.forEach(item => {
            total += item.price * item.quantity;
            return total;
          })
        });
      }
    }
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      total: this.state.cart.forEach(item => {
        total += item.price * item.quantity;
        return total;
      })
    })
  }

}

export default Store;