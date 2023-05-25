import { generateCode } from './utils';

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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const updatedCartList = this.state.cartList.filter((item) => item.code !== code);
    this.setState({
      ...this.state,
      cartList: updatedCartList,
      totalAmount: updatedCartList.reduce((acc, item) => acc + (item.count ?? 0) * item.price, 0),
      countOfUniqueProducts: this.state.countOfUniqueProducts - 1,
    });
  }

  increaseCount(code) {
    const existingItem = this.state.cartList.find((item) => item.code === code);
    let updatedCartList;
    if (!existingItem) {
      const newItem = this.state.list.find((item) => item.code === code);
      updatedCartList = [...this.state.cartList, { ...newItem, count: newItem.count + 1 }];
    } else {
      updatedCartList = this.state.cartList.map((item) =>
        item.code === code ? { ...item, count: item.count + 1 } : item,
      );
    }
    this.setState({
      ...this.state,
      cartList: updatedCartList,
      totalAmount: updatedCartList.reduce((acc, item) => acc + item.price * (item.count ?? 0), 0),
      countOfUniqueProducts: updatedCartList.reduce((acc, item) => acc + !!item.count, 0),
    });
  }
}

export default Store;
