import { generateCode } from "./utils";
import { CalcTotalPrice } from "./utils";
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
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItem(code) {
    const newBasket = this.state.basket.list.filter((element) => element.code !== code);
    this.setState({
      ...this.state,
      // Новая корзина, в которой не будет удаляемой записи
      basket: {
        list: newBasket,
        totalPrice: CalcTotalPrice(newBasket),
        totalCount: this.state.basket.totalCount-1,
      },
    });
  }

  /**
   * Добавление товара в корзину
   * @param newState {Object}
   */
  addBasket(item) {
    const findItem = this.state.basket.list.find((_) => _.code === item.code);
    if (!!findItem) {
      const newBasket = this.state.basket.list.map((element) => {
        if (element.code === item.code) {
          element.count = element.count+1;
        }
        return element;
      });
      this.setState({
        ...this.state,
        basket: {
          list: newBasket,
          totalPrice: CalcTotalPrice(newBasket),
          totalCount: newBasket.length,
        },
      });
    } else {
      this.setState({
        ...this.state,
        basket: {
          list: [...this.state.basket.list, item],
          totalPrice: CalcTotalPrice([...this.state.basket.list, item]),
          totalCount: this.state.basket.totalCount + 1,
        },
      });
    }
  }
}

export default Store;
