import { createContext } from "react";
import { generateCode } from "./utils";

const StoreContext = createContext();

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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    });
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
    });
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
    });
  }

  /**
   * Открытие и закрытие корзины
   * @param {boolean} show 
   */
  setCartVisibility(show) {
    this.setState({
      ...this.state,
      showCart: show
    });
  }

  /**
   * Удаление из корзины
   * @param {Number} code 
   */
  removeFromCart(code) {
    const item = this.state.cart.items.find((item) => item.code === code);
    if (!item) {
      return;
    }
    this.setState({
      ...this.state,
      cart: {
        items: this.state.cart.items.filter(item => item.code !== code),
        total: this.state.cart.total -= (item.price * item.amount),
        amount: this.state.cart.amount -= 1,
      },
    });
  }

  /**
   * Добавление в корзину
   * @param {Number} code 
   */
  addToCart(code) {
    const item = this.state.list.find((item) => item.code === code);
    if (!item) {
      return;
    }

    let newCartList = [...this.state.cart.items];
    const itemIndex = newCartList.findIndex((item) => item.code === code);
    let newAmount = this.state.cart.amount;
    if (itemIndex === -1) {
      newCartList.push({...item, amount: 1});
      newAmount++;
    } else {
      newCartList[itemIndex].amount++
    }
    this.setState({
      ...this.state,
      cart: {
        items: newCartList,
        total: this.state.cart.total += item.price,
        amount: newAmount,
      }
    });
  }
}

export  {Store, StoreContext};
