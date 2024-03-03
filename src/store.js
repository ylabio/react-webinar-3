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
   * Добавление товара в корзину
   * @param item
   */
  addInCart(item) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart, {...item, count: 1}],
    })
  };

  /**
   * Увеличение счетчика у выбранного элемента
   * @param item 
   */
  increaseCount(item) {
    this.state.cart.map(elem => {
      if (elem.code === item.code) {
        // Возвращаем выбранный элемент, увеличивая его счетчик
        return {...elem, count: elem.count++}
      }
    })
    // Обновляем состояние корзины
    this.setState({
      ...this.state,
      cart: this.state.cart
    })
  }

  /**
   * Переключатель функций добавления товара
   * @param item 
   */
  toggleAdd(item) {
    const isInCart = this.state.cart.some(({code}) => code === item.code)

    if (!isInCart) {
      this.addInCart(item);
    } else {
      this.increaseCount(item);
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(({code}) => code !== item.code)
    })
  };

}

export default Store;
