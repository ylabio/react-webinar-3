import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cart: [], // Добавляем корзину в начальное состояние
      cartCount: 0,
      cartTotal: 0,
      ...initState,
    };

    this.listeners = []; // Слушатели изменений состояния
  }
  /**
   * Добавление товара в корзину
   * @param {Object} item - Товар для добавления
   */
  addToCart(item) {
    const currentState = this.getState();
    const existingItem = currentState.cart.find(cartItem => cartItem.code === item.code);

    const newCart = existingItem
      ? currentState.cart.map(cartItem =>
          cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      : [...currentState.cart, { ...item, quantity: 1 }];

    this.setState({
      ...currentState,
      cart: newCart,
      cartCount: newCart.length,
      cartTotal: newCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
  }
  /**
   * Удаление товара из корзины
   * @param {number} code - Код товара
   */
  removeFromCart(code) {
    const currentState = this.getState();
    const newCart = currentState.cart.filter(item => item.code !== code);

    this.setState({
      ...currentState,
      cart: newCart,
      cartCount: newCart.length,
      cartTotal: newCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
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
    this.state = {
      ...this.state,
      ...newState,
    };
    console.log('Updated state:', this.state); // Для отладки
    this.listeners.forEach(listener => listener());
  }

  /**
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
  //   });
  // }

  /**
   * Удаление записи по коду
  //  * @param code
  //  */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code),
  //   });
  // }

  /**
//    * Выделение записи по коду
//    * @param code
//    */
  //   selectItem(code) {
  //     this.setState({
  //       ...this.state,
  //       list: this.state.list.map(item => {
  //         if (item.code === code) {
  //           // Смена выделения и подсчёт
  //           return {
  //             ...item,
  //             selected: !item.selected,
  //             count: item.selected ? item.count : item.count + 1 || 1,
  //           };
  //         }
  //         // Сброс выделения если выделена
  //         return item.selected ? { ...item, selected: false } : item;
  //       }),
  //     });
  //   }
}
export default Store;
