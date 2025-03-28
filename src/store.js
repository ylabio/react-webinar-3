import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.listCart = [];
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
  addItem(id) {
    const existingItem = this.state.listCart?.find(item => item.code === id);

    if (existingItem) {
      const updatedListCart = this.state.listCart.map(item =>
        item.code === id ? {...item, count: item.count + 1} : item,
      );

      this.setState({
        ...this.state,
        listCart: updatedListCart,
      });
    } else {
      const newItem = this.state.list.find(item => item.code === id);

      if (newItem) {
        this.setState({
          ...this.state,
          listCart: [...this.state.listCart, {...newItem, count: 1}],
        });
      }
    }
    console.log(this.state.listCart);
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      listCart: this.state.listCart.filter(item => item.code !== code),
    });
  }

  getCartCount() {
    let count = 0;
    for (const item of this.state.listCart) {
      count += item.count;
    }

    return count;
  }
  getCartPrice() {
    let sum = 0;
    for (const item of this.state.listCart) {
      sum += item.count * item.price;
    }

    return sum;
  }

  getCartItem() {
    return this.state.listCart.length;
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
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
