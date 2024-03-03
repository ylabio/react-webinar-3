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
   * Добавление товара в корзину
   * @param code
   */
  addItem(code) {
    if (this.state.cart.length) {
      let arr = [];
      for (const i of this.state.cart) {
        arr.push(i.code);
      }

      if (arr.includes(code)) {
        this.setState({
          ...this.state,
          cart: [
            ...this.state.cart.map((item) =>
              item.code === code
                ? { ...item, count: [++item.count] }
                : { ...item }
            ),
          ],
        });
      } else {
        this.setState({
          ...this.state,
          cart: [
            ...this.state.cart,
            ...this.state.list.filter((item) => item.code === code),
          ],
        });
      }
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          ...this.state.list.filter((item) => item.code === code),
        ],
      });
    }
  }

  /**
   * Удалить товар из корзины
    * @param code
   */
  removeItemFromCart(code) {
    let count = 0;
    [...this.state.cart].forEach((el) => {
      if (el.code === code) {
        [...this.state.cart.splice(count, 1)];
        this.setState({
          ...this.state,
          cart: [...this.state.cart],
        });
      }
      count++;
      this.itog();
    });
  }

  /**
   * Итоговая стоимость всех товаров
   */

  itog() {
    if ([this.state.cart.length] != 0) {
      this.setState({
        ...this.state,
        total: [
          [...this.state.cart.map((i) => i.price * i.count)].reduce(
            (el, acc) => el + acc
          ),
        ],
      });
    } else {
      this.setState({
        ...this.state,
        total: 0,
      });
    }
  }

}

export default Store;
