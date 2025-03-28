/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list,
      cart: {} // Корзина товаров
    };
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
   * Добавление товара в корзину по коду
   */
  addItemToCart(code) {
    this.state.cart[code] ? this.state.cart[code]++ : this.state.cart[code] = 1;
    
    this.setState({
      ...this.state,
      cart: {...this.state.cart}
    });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItem(code) {
    
  }

  /**
   * Переход в корзину
   */
  showCartItems() {
    console.log("Товары в корзине:", this.state.cart);
  }
}

export default Store;
