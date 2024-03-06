import {generateCode} from "./utils";

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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Добавление товара в корзину
   * @param code {Number}
   */
  addItemToCart(code) {
    const isItemInCart = this.state.cart.cartList.some(cartItem => cartItem.code === code)
    const listItem = this.state.list.find(item => item.code === code)
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartTotalPrice: this.state.cart.cartTotalPrice + listItem.price,
        cartItemsCount: isItemInCart ? this.state.cart.cartItemsCount : this.state.cart.cartItemsCount + 1,
        cartList: isItemInCart 
          ? this.state.cart.cartList.map(cartItem => {
            if (cartItem.code === code) {
              return {...listItem, count: cartItem.count + 1}
            }
            return cartItem
          })
          : [...this.state.cart.cartList, {...listItem, count: 1}]
      }
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Удаление товара из корзины
   * @param code
 */
  deleteItemFromCart(code) {
    const cartItem = this.state.cart.cartList.find(item => item.code === code)
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartItemsCount: this.state.cart.cartItemsCount - 1,
        cartTotalPrice: this.state.cart.cartTotalPrice - cartItem.price * cartItem.count,
        cartList: this.state.cart.cartList.filter(item => item.code !== code)
      }
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
