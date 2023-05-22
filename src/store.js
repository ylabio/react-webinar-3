import { generateCode } from "./utils";

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
   * Добавление новой записи
   */
  addItem({ code }) {
    const item = this.state.cart.find(item => item.code === code);
    if (item) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(el => {
          if (el.code === item.code) {
            return {
              ...el,
              amount: el.amount + 1
            }
          }
          return el;
        }),
        cartPrice: this.state.cartPrice + item.price
      })
    }
    else {
      const item = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, amount: 1 }],
        cartPrice: this.state.cartPrice + item.price,
        cartLength: this.state.cartLength + 1
      })
    }
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem({ code }) {
    const item = this.state.cart.find(el => el.code === code);
    if (item) {
      this.setState({
        ...this.state,
        // Новый список, в котором не будет удаляемой записи
        cart: this.state.cart.filter(el => el.code !== code),
        cartPrice: this.state.cartPrice - (item.price * item.amount),
        cartLength: this.state.cartLength - 1
      })
    }
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
        return item.selected ? { ...item, selected: false } : item;
      })
    })
  }
}

export default Store;
