import { generateCode } from './utils';

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
      this.listeners = this.listeners.filter((item) => item !== listener);
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

  calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  addItemToCart(code) {
    const { cartItems, list, totalPrice } = this.state;    
    const foundIndex = cartItems.findIndex((item) => item.code === code); 
    // ищем товар с указанным кодом в корзине
    if (foundIndex !== -1) {
      // если товар найден в корзине
      const updatedItem = {
        ...cartItems[foundIndex],
        quantity: cartItems[foundIndex].quantity + 1,
      };
      const newCart = [
        ...cartItems.slice(0, foundIndex), // копируем все элементы до найденного товара
        updatedItem,
        ...cartItems.slice(foundIndex + 1), // копируем все элементы после найденного товара
      ];
      const newTotalPrice = this.calculateTotalPrice(newCart)

      this.setState({
        ...this.state,
        cartItems: newCart,
        totalPrice: newTotalPrice,
      });
    } else {
      // если товара еще не было в корзине
      const item = list.find((item) => item.code === code);
      const newTotalPrice = totalPrice + item.price;
      
      this.setState({
        ...this.state,
        cartItems: [...cartItems, { ...item, quantity: 1 }],
        totalPrice: newTotalPrice,
      });
    }
  }

  removeItemFromCart(code) {
    const newCartItems = this.state.cartItems.filter(el => el.code !== code);
    const newTotalPrice = this.calculateTotalPrice(newCartItems);

    this.setState({
      ...this.state,
      cartItems: newCartItems,
      totalPrice: newTotalPrice,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          return item.selected ? { ...item, selected: false } : item;
        }
      }),
    });
  }
}

export default Store;
