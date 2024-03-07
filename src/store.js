import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cart: []};
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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
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
   * Получение количества товаров и суммы
   */
  getCartSum() {
    const result = {
      items: 0,
      sum: 0,
    }
    this.state.cart.forEach(item => {
      if (item.count > 0) {
        result.items += 1;
        result.sum += item.count * item.price;
      }
    });
    return result;
  }

  /**
   * Добавление элемента в корзину
   * @param newItem
   */
  addToCart(newItem) {
    let noItem = true;
    this.setState({
      ...this.state,
      cart: this.state.cart.map(item => {
        if (item.code === newItem.code) {
          noItem = false
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      })
    })
    if (noItem)
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...newItem, count: 1 }]
      })
  }

  /**
   * Удаление элемента из корзины
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  }
}

export default Store;
