import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cartItems: [],
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

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemCart(item) {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.code !== item.code
    );
    this.setState({ ...this.state, cartItems: updatedCartItems });
    //   const { cartItems } = this.state;

    //   const updatedCartItems = cartItems.map(cartItem => {
    //     if (cartItem.code === item) {
    //       return { ...cartItem, quantity: cartItem.quantity - 1 };
    //     }
    //   return cartItem;
    // }).filter(cartItem => cartItem.quantity > 0);

    //   this.setState({ ...this.state, cartItems: updatedCartItems });
  }

  addItemToCart(item) {
    // const cartItems = [...this.state.cartItems, item];
    // this.setState({ ...this.state, cartItems });
    const { cartItems } = this.state;
    let isItemInCart = false;

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.code === item.code) {
        isItemInCart = true;
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    if (!isItemInCart) {
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    this.setState({ ...this.state, cartItems: updatedCartItems });
  }

  totalPrice() {
    const { cartItems } = this.state;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.price * cartItem.quantity;
    });

    return totalPrice;
  }

  toggleCart(isCard) {
    this.setState({
      ...this.state,
      cartVisible: isCard,
    });
  }
}

export default Store;
