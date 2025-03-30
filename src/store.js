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

  /**
   * Обновление состояния корзины
   * @param item {Object}
   */
  setCart(item) {
    const currentCart = this.state.cart.items;
    const findItem = currentCart.find(elem => elem.code === item.code);

    let updatedCart;
    let newTotalPrice;
    let newTotalCount;

    if (findItem) {
      updatedCart = currentCart.map(elem => {
        if (elem.code === item.code) {
          return { ...elem, count: elem.count + 1 };
        }
        return elem;
      })

    } else {
      const newElem = { ...item, count: 1 };
      updatedCart = [...currentCart, newElem];
    }

    newTotalPrice = updatedCart.reduce((acc, elem) => acc + elem.count * elem.price, 0);
    newTotalCount = updatedCart.length;

    this.setState({
      ...this.state,
      cart: {
        items: updatedCart,
        totalPrice: newTotalPrice,
        totalCount: newTotalCount,
      },
    })
  }
  /**
   * Удаление товара из корзины
   * @param code {Number}
   */
  deleteFromCart(code) {
    const currentCart = this.state.cart.items;
    const updatedCart = currentCart.filter(item => item.code !== code);
    const newTotalPrice = updatedCart.reduce((acc, elem) => acc + elem.count * elem.price, 0);
    const newTotalCount = updatedCart.length;

    this.setState({
      ...this.state,
      cart: {
        items: updatedCart,
        totalPrice: newTotalPrice,
        totalCount: newTotalCount,
      },
    })
  }
}

export default Store;
