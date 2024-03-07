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
   * Удаление записи
   */
  deleteItem(code) {
    let price;
    let count;
    const updateCart = [
      ...this.state.cart.filter((item) => {
        if (item.code === code) {
          price = item.price;
          count = item.count;
          item.count = 0;
        }
        return item.code !== code;
      }),
    ];
    const sum = this.state.sum - price * count;
    this.setState({
      ...this.state,
      cart: updateCart,
      sum: sum,
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  itemToCart(code) {
    const updateCart = [
      ...this.state.cart,
      ...this.state.list.filter((item) => {
        if (item.code === code) return { ...item, count: (item.count += 1) };
      }),
    ];
    const uniqProduct = [...new Set(updateCart)];

    const sum = uniqProduct.reduce((acc, cur) => {
      return acc + cur.price * cur.count;
    }, 0);

    this.setState({
      ...this.state,
      cart: uniqProduct,
      sum: sum,
    });
    console.log(this.state);
  }
}

export default Store;
