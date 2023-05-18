import { calculateBasketPrice, generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;

    this.state.basket ??= []; // es2020+. для деградации есть бабел или ts.config
    this.state.info ??= { goods: 0, price: 0 };

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
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
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
   * Добавление товара в корзину
   * @param code
   */
  addItemToBasket(code) {
    if (this.state.basket.find((item) => item.code === code)) { // если твар уже есть
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code)
            return { ...item, count: item.count + 1 }
          return item;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        basket: this.state.basket.concat({
          ...this.state.list.find(item => item.code === code),
          count: 1
        })
      });
    };
    this.setState({
      ...this.state,
      info: {
        goods: this.state.basket.length,
        price: calculateBasketPrice(this.state.basket)
      }
    });
  }

  /**
  * Удаление товара из корзины
  * @param code
  */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code)
    });
    this.setState({
      ...this.state,
      info: {
        goods: this.state.basket.length,
        price: calculateBasketPrice(this.state.basket)
      }
    });
  }
}

export default Store;