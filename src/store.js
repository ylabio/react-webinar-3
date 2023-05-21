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

  addCartItem(code) {
    const cartList = [...this.state.cartList];
		let isUpdated;
    let item = cartList.find((unit) => unit.code == code);
    if (item) {
      ++item.count;
    } else {
      item = this.state.list.find((unit) => unit.code == code);
      cartList.push({...item, count: 1});
			isUpdated = true;
    }
    this.setState({
      ...this.state, cartCountTotal: isUpdated ? this.state.cartCountTotal + 1 : this.state.cartCountTotal,
      cartPriceTotal: this.state.cartPriceTotal + item.price, cartList
    });
  }

  deleteCartItem(code) {
		const cartList = [...this.state.cartList]
		const itemToDeleteIdex = this.state.cartList.findIndex((unit) => unit.code == code)
		const [removedItem] = cartList.splice(itemToDeleteIdex, 1);
		const cartPriceTotal = this.state.cartPriceTotal - removedItem.count * removedItem.price;
		const cartCountTotal = this.state.cartCountTotal - 1;
		
    this.setState({
      ...this.state, cartList, cartPriceTotal, cartCountTotal,
    });
  }
}

export default Store;