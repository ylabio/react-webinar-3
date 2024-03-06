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

  calculateCartSum(items) {
    let sum = 0;
    if (items.length > 0) {
      items.forEach((item) => {
        sum += item.price * item.count;
      });
    }
    return sum;
  }

  /**
   * Добавление нового товара по коду
   * @param code
   */
  addItem(code) {
    let isDubl = false;
    const newItem = this.state.list.find(item => item.code === code);
    let newList = [...this.state.cart];
    newList.map(it => {
      if (it.code === newItem.code) {
        it.count++;
        isDubl = true;
      }
    });

    if (!isDubl) {
      newItem.count = 1;
      newList = [...newList, newItem];
    }

    this.setState({
      ...this.state,
      cart: newList,
      cartCount: newList.length,
      cartSum: this.calculateCartSum(newList)
    });
  };

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {
    let newList = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: newList,
      cartCount: newList.length,
      cartSum: this.calculateCartSum(newList)
    });
  };
}

export default Store;
