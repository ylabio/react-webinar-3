import { generateCode } from "./utils";

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

  /**
   * Добавление товара в корзину
   */
  addItem(addedItem) {
    const itemExists = this.state.cart.find(
      (cartItem) => cartItem.code === addedItem.code
    );

    if (itemExists) {
      console.log(itemExists);
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartItem) =>
          cartItem.code === itemExists.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          {
            code: addedItem.code,
            title: addedItem.title,
            price: addedItem.price,
            quantity: 1,
          },
        ],
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(item) {
    const itemExists = this.state.cart.find(
      (cartItem) => cartItem.code === item.code
    );

    console.log(itemExists);

    this.setState({
      ...this.state,
      cart: this.state.cart.filter((cartItem) => cartItem.code !== item.code),
    });
  }
}

export default Store;
