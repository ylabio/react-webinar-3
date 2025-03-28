
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
   * Добавление новой записи
   */
  addItemToCart(title) {
    const finditem = this.state.list.find(item => item.title === title);
    const existingItem = this.state.cartList.find(item => item.title === title);
    if (existingItem) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map(item =>
          item.title === title ? { ...item, count: item.count + 1 } : item
        ),
      });
    } else {
      this.setState({
           ...this.state,
           cartList: [...this.state.cartList, { title: finditem.title, count: 1, price: finditem.price }],
      });
    }
  }

  /**
   * Удаление записи по названию
   * @param title
   */
  deleteItem(title) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.title !== title),
    });
  }

  /**
   * Получение итоговой стоимости товаров
   */
  getTotalPrice() {
    return  this.state.cartList
      .reduce((sum, item) => sum + item.price * item.count, 0);
  }
}

export default Store;
