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

  addItemToBasket(item) {
    const isItemInBasket = this.state.basket.items.some(
      basketItem => basketItem.code === item.code,
    );

    if (isItemInBasket) {
      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          items: this.state.basket.items.map(basketItem =>
            basketItem.code === item.code
              ? { ...basketItem, count: basketItem.count + 1 }
              : basketItem,
          ),
          sum: this.state.basket.sum + item.price,
        },
      });
    } else {
      this.setState({
        ...this.state,
        basket: {
          items: [...this.state.basket.items, { ...item, count: 1 }],
          count: this.state.basket.count + 1,
          sum: this.state.basket.sum + item.price,
        },
      });
    }
  }

  removeItemFromBasket(code) {
    const currentItem = this.state.basket.items.find(item => item.code === code);
    const price = currentItem.price;
    const count = currentItem.count;

    this.setState({
      ...this.state,
      basket: {
        items: this.state.basket.items.filter(item => item.code !== code),
        count: this.state.basket.count - 1,
        sum: this.state.basket.sum - price * count,
      },
    });
  }
}

export default Store;
