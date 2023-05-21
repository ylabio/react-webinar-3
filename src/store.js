import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.order = []; //создаем хранилище заказов
    this.state.cartTotalPrice = 0; //Общая сумма заказа
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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Добавление товара в заказ
   * @param item
   */
  addItemToCart(item) {
    const itemIndex = this.state.order.findIndex((orderItem) => orderItem.code === item.code);
    if(itemIndex < 0) {
      const newItem = {
        ...item,
        count: 1,
      };
      this.setState({
        ...this.state,
        order: [...this.state.order, newItem],
        cartTotalPrice: this.state.cartTotalPrice + item.price,
        orderLength: this.state.order.length + 1,
      })
    } else {
      let totalPrice = 0;
      const newOrder = this.state.order.map((orderItem, code) => {
        if(code === itemIndex) {
          totalPrice = orderItem.price;
          return {
            ...orderItem,
            count: orderItem.count + 1,
          }
        } else {
          return orderItem;
        }
      })
      this.setState({
        ...this.state,
        order: newOrder,
        cartTotalPrice: this.state.cartTotalPrice + totalPrice,
      })
    }
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

    /**
   * Удаление товара из заказа
   * @param item
   */
  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      order: this.state.order.filter(el => el.code !== item.code),
      orderLength: this.state.order.length - 1,
      cartTotalPrice: this.state.cartTotalPrice - (item.count * item.price),
    })
  };

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
