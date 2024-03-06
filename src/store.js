import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  modal() {
    document.body.style.overflow = "hidden";
  }

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
  addItem(ele, quantity) {
    if (quantity == 0) {
      this.setState({
        ...this.state,
        list: this.state.list.map((item) => {
          if (item.code === ele.code) {
            return {
              ...item,
              quantity: 1,
            };
          }
          return item;
        }),
      });
      this.setState({
        ...this.state,
        cartlist: [
          ...this.state.cartlist,
          {
            code: ele.code,
            title: ele.title,
            price: ele.price,
            quantity: 1,
          },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        cartlist: this.state.cartlist.map((item) => {
          if (item.code === ele.code) {
            return {
              ...item,
              quantity: 1 + item.quantity,
            };
          }
          return item;
        }),
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(ele) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === ele.code) {
          return {
            ...item,
            quantity: 0,
          };
        }
        return item;
      }),
    });
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartlist: this.state.cartlist.filter((item) => item.code !== ele.code),
    });
  }
}

export default Store;
