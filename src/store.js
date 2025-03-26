import {generateCode} from './utils';
import item from "./components/item";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.cart = {
      list: [],
      totalPrice: 0,
    }// Слушатели изменений состояния
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
   * Выбор состояния корзины товаров
   * @returns {Object}
   */
  getCartState() {
    return this.cart;
  }

  /**
   * Установка состояния корзины товаров
   * @param newCartState {Object}
   */
  setCartState(newCartState) {
    this.cart = newCartState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // /**
  //  * Добавление новой записи
  //  */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}],
  //   });
  // }

  /**

   * Добавление товара в корзигу
   * @param itemCode {Number}
   */
  addItemToCart(itemCode) {
    let cartList = [];
    const isHasItemInCart = this.cart.list.some(item => item.code === itemCode);
    if (isHasItemInCart) {
      cartList = this.cart.list.map(item => {
        if (item.code === itemCode) {
          return {...item, count: item.count + 1, totalPrice: item.price * (item.count + 1) };
        }
        return {...item};
      });
    } else {
      const defaultItem = {...this.state.list.filter(item => item.code === itemCode)[0]};
      cartList = [...this.cart.list, {...defaultItem, count: 1}];
    }

    this.setCartState({
      ...this.cart,
      list: cartList,
    });
  }

  /**
   * Удаление записи по коду
   * @param itemCode {Number}
   */
  deleteItemFromCart(itemCode) {
    this.setCartState({
      ...this.cart,
      // Новый список, в котором не будет удаляемой записи
      list: this.cart.list.filter(item => item.code !== itemCode),
    });
  }
}

export default Store;
