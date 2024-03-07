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
    // Добавляем элемент в корзину, присваивая ему счетчик 
    this.state.cart.push({...item, count: 1});
    // Обновляем состояние корзины
    this.setState({
      ...this.state,
      cart: this.state.cart
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
   * Расчет стоимости товаров
   * @returns {Number}
   */
  calculatePrice() {
    if (this.state.cart.length > 0) {
      return this.state.cart.reduce((acc, item) => {
        return acc + (item.price * item.count);
      }, 0);
    }
    return 0;
  }

  /**
   * Расчет количества уникального товаров
   * @returns {Number}
   */
  calculateItems() {
    return this.state.cart.length;
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

    this.calculatePrice();
    this.calculateItems();
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
