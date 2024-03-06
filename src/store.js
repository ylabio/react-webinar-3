import { generateCode, monefy } from "./utils";

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
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись", price: 0 },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
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

  /**
   * Добавления товара в корзину
   * @param {{code, title: String, price: Number }} newProduct
   */
  addToCart(newProduct) {
    const index = this.state.cart.findIndex((product) => {
      if (product.code === newProduct.code) {
        return true;
      } else {
        return false;
      }
    });

    if (index !== -1) {
      const cart = [...this.state.cart];
      const product = cart[index];

      product.count += 1;
      product.content = [monefy(product.price), product.count + " шт"];

      this.setState({
        ...this.state,
        cart,
      });
    } else {
      newProduct.count = 1;
      newProduct.content = [monefy(newProduct.price), newProduct.count + " шт"];

      this.setState({
        ...this.state,
        cart: [...this.state.cart, newProduct],
      });
    }
  }
  /**
   * Удаление товара из корзины по его коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((product) => product.code !== code),
    });
  }

  /**
   * Суммирует цены продуктов в корзине
   * @returns {Number}
   */
  sumCartPrices() {
    return this.state.cart.reduce((sum, product) => {
      return sum + product.price * product.count;
    }, 0);
  }
}

export default Store;
