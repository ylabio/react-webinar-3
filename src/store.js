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
   * @param code
   */
  addItemToShoppingCart(code) {
    const condition = this.state.shoppingCart.list.some(cartItem => cartItem.code === code)
    let isNew = false;

    const item = this.state.list.find(item => item.code === code)
    item.inCart = true

    let newShoppingCartList;

    if (condition) {
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
   * @param item
   */
  removeItemFromShoppingCart(item) {
    let newShoppingCartList= [...this.state.shoppingCart.list].filter(cartItem => cartItem.code !== item.code)

    this.setState({
      ...this.state,
      shoppingCart: {
        list: newShoppingCartList,
        total: {
          totalAmount: this.state.shoppingCart.total.totalAmount - 1,
          totalCost: this.state.shoppingCart.total.totalCost - (item.price * item.amount),
        }
      }
    })
  };
}

export default Store;
