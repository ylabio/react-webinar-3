import {generateCode} from "./utils";

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

  addToCart(code) {
    let items = [...this.state.cart.items];
    let itemIdx = this.state.cart.items.findIndex(item => item.code === code);
    if (itemIdx !== -1) {
      items = items.map((item, i) => (
        i === itemIdx ? {...item, amount: item.amount + 1} : item
      ));
    } else {
      const item = this.state.list.find(item => item.code === code);
      items.push({...item, amount: 1});
    }

    const totalPrice = items.reduce((acc, cur) => cur.amount * cur.price + acc, 0);

    this.setState({
      ...this.state,
      cart: {
        items: [...items],
        totalPrice,
        length: items.length
      }
    });
  }

  removeFromCart(code) {
    const items = this.state.cart.items.filter(item => item.code !== code);
    const totalPrice = items.reduce((acc, cur) => cur.amount * cur.price + acc, 0);

    this.setState({
      ...this.state,
      cart: {
        items: [...items],
        totalPrice,
        length: items.length
      },
    });
  }
}

export default Store;
