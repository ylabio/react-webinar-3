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
   * Обновление состояния cart
   * @param data {Array}
   */
  updateCart(data) {
    const newCartList = data;
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        list: newCartList,
        totalSum: newCartList.reduce((acc, el) => {
          return acc += (parseInt(el.price.replace(/\s/g, "")) * el.count)
        }, 0),
        quantity: newCartList.length
      }
    });
  }

  /**
   * Добавление товара в корзину
   */
  addItem(code) {
    const isInCart = this.getState().cart.list.find(el => el.code === code);    

    if (!isInCart) {
     this.state.cart.list.push({...this.getState().list.find(el => el.code === code), count: 1})
    } else {
      this.updateCart(this.state.cart.list.map(el => {
        if (el.code === code) return {...el, count: el.count + 1}
        return el;
        } 
      ));
    }

    this.updateCart(this.state.cart.list.sort((a, b) => a.code - b.code))
  
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.updateCart(this.state.cart.list.filter(item => item.code !== code));
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

  /**
   * Закрытие корзины
   */
  closeCart() {
    this.setState({ 
      ...this.state,
      isOpenCart: false
    })
  }

  /**
   * Открытие корзины
   */
  openCart() {
    this.setState({
      ...this.state,
      isOpenCart: true
    })
  }
}


export default Store;
