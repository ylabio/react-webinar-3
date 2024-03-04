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
  addItem(item) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === item.code);
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === item.code) {
            return {
              ...cartItem,
              count: cartItem.count + 1
            };
          } else {
            return cartItem;
          }
        })
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {
          code: item.code,
          title: item.title,
          price: item.price,
          count: 1
        }]
      });
    }
  };

  /**
   * Удаление товаро из коризны
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  /**
   * Открытие/закртие корзины
   */
  changeCartIsOpen() {
    this.setState({
      ...this.state,
      cartIsOpen: !this.state.cartIsOpen,
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
