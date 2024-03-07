/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      carts: []  
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
   * Удаление товара по коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      carts: this.state.carts.filter(item => item.code !== code) 
    })
  };

  /**
 * Добавление товара в корзину
 * @param code
 */
  addToCart(code) {
    const item = this.state.list.find(i => i.code === code);
  
    if (!item) {
      return;  
    }
  
    const itemInCart = this.state.carts.find(i => i.code === code);
  
    this.setState({
      ...this.state,
      carts: itemInCart
        ? this.state.carts.map(item =>
            item.code === code
              ? {...item, count: item.count + 1}  
              : item  
          )
        : [
          ...this.state.carts,
          {...item, count: 1}  
        ]
    });
  }
}

export default Store;
