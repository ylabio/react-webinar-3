

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: []
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
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };


  addItemToCart(code) {
    const selectedItems = this.state.list.find(i => i.code === code);
    if (selectedItems) {
      const cartItems = this.state.cart.find(i => i.code === code);
      if (cartItems) {
        this.setState({
          ...this.state,
          cart: this.state.cart.map(i => {
            if (i.code === code) {
              return {
                ...i,
                quantity: i.quantity + 1
              }
            }
            return i;
          }),
        })
      } else {
        const cartItem = {
          ...selectedItems,
          quantity: 1
        };
        this.setState({
          ...this.state,
          cart: [...this.state.cart, cartItem],
        })
      }
      this.updatePriceCount();
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code)
  //   })
  // };

  deleteItemToCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
    this.updatePriceCount();
  };

  calculatePrice() {
    let priceCount = 0;
    this.state.cart.forEach(i => {
      priceCount += i.price * i.quantity;
    });
    return priceCount;
  }

  updatePriceCount() {
    this.setState({
      ...this.state,
      totalPrice: this.calculatePrice()
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? {...item, selected: false} : item;
  //     })
  //   })
  // }
}

export default Store;
