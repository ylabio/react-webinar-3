import modal from "./components/modal";
import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.modal = false;
    this.state.cart = {
      state: {},
      count: {
        goods: 0,
        costs: 0
      },
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
  };

  /**
   * Open the modal
   */
  openModal() {
    this.setState({
      ...this.state,
      modal: true
    });
  };

  /**
   * Close the modal
   */
  closeModal() {
    this.setState({
      ...this.state,
      modal: false
    });
  };

  /**
   * Counting of totals goods and costs
   */
  cartCounter() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        count: Object.values(this.state.cart.state).reduce((acc, elm) => {
          if (elm.tocart && elm.tocart !== 0) {
            const costs = elm.price * elm.tocart;
            return { goods: acc.goods + 1, costs: acc.costs + costs}
          }
          return acc;
        }, { goods: 0, costs: 0 }),
      },
    });
  };

  /**
   * Adding a goods to the cart by code
   * @param code
   */
  addToCart(code) {
    const findItem = this.state.list.find((elm) => elm.code === code);
    if (this.state.cart.state.hasOwnProperty(findItem.code)) {
      findItem.tocart = this.state.cart.state[findItem.code].tocart + 1;
    } else {
      findItem.tocart = 1;
    }
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        state: {
          ...this.state.cart.state,
          [findItem.code]: findItem,
        }
      }
    });
    this.cartCounter();
  };

  /**
   * Removing a goods from the cart by code
   * @param code
   */
  delFromCart(code) {
    const findItem = this.state.list.find((elm) => elm.code === code);
    delete this.state.cart.state[findItem.code];
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        state: {
          ...this.state.cart.state,
        }
      }
    });
    this.cartCounter();
  };
}

export default Store;
