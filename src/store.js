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
   * Добавление предмета в корзину
   * @param item {Object}
   */
  addItemToShoppingCart(item) {
    let newShoppingCartList;
    let isNew = false;

    if (this.state.shoppingCart.list.some(cartItem => cartItem.code === item.code)) {
       newShoppingCartList = this.state.shoppingCart.list.map(cartItem => {
        if (cartItem.code === item.code) return {...cartItem, amount: cartItem.amount + 1}
        return cartItem
      })
    } else {
      newShoppingCartList = [...this.state.shoppingCart.list, {...item, amount: 1}]
      isNew = !isNew
    }

    this.setState({
      ...this.state,
      shoppingCart: {
        list: newShoppingCartList,
        total: {
          totalAmount: isNew
            ? this.state.shoppingCart.total.totalAmount + 1
            : this.state.shoppingCart.total.totalAmount,
          totalCost: this.state.shoppingCart.total.totalCost + item.price,
        }
      }
    })
  };

  /**
   * Удаление предмета из корзины
   * @param code
   */
  removeItemFromShoppingCart(item) {
    const condition = this.state.shoppingCart.list.some(
      cartItem => (cartItem.code === item.code && cartItem.amount > 1)
    )

    let newShoppingCartList;
    let isLast = false;

    if (condition) {
       newShoppingCartList = this.state.shoppingCart.list.map(cartItem => {
        if (cartItem.code === item.code) return {...cartItem, amount: cartItem.amount - 1}
        return cartItem
      })
    } else {
      newShoppingCartList = [...this.state.shoppingCart.list].filter(cartItem => cartItem.code !== item.code)
      isLast = !isLast
    }

    this.setState({
      ...this.state,
      shoppingCart: {
        list: newShoppingCartList,
        total: {
          totalAmount: isLast
            ? this.state.shoppingCart.total.totalAmount - 1
            : this.state.shoppingCart.total.totalAmount,
          totalCost: this.state.shoppingCart.total.totalCost - item.price,
        }
      }
    })
  };
}

export default Store;
