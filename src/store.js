/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.itemsInCart = new Set(); // Товары в корзине
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

  addItemInCart(code) {
    this.state.list.map(item => {
      if (item.code === code) {
        this.itemsInCart.add(item);
      }
    });
  }

  deleteItemInCart(code) {
    this.setState({
      ...this.state,
      itemsInCart: this.itemsInCart.forEach((item) => {
        if (item.code === code) {
          item.count = 0;
          this.itemsInCart.delete(item);
        }
      })
    });
  }

  initAmountItems(setAmount, setSum) {
    let amount = 0;
    let sum = 0;
    this.state.list.map((item) => {
      if (item.count) {
        amount ++;
        sum += item.price * item.count ;
      }
    });
    setAmount(amount);
    setSum(sum);
  }
}

export default Store;
