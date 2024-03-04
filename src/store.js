import { countLeftUniqueProducts, generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = this.state.list.map((item) => {
      return { ...item, count: 0 };
    });
    this.state.uniqueProductsCount = new Set();
    this.state.price = 0;
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
   * Добавление нового товара в корзину
   */
  addToCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((item) => {
        if (item.code === code) {
          // Добавление количества товара
          return {
            ...item,
            count: item.count ? ++item.count : 1,
          };
        }
        return item;
      }),
      //подсчёт количества уникальных товаров в корзине
      uniqueProductsCount: this.state.uniqueProductsCount.add(code),
      //подсёт цены товаров в корзине
      price: this.state.price + this.state.list[code - 1].price,
    });
  }

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {
    console.log(this.state);
    this.setState({
      ...this.state,
      // Новый список, в котором будет на один товар указанного кода меньше
      cart: this.state.cart.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            count: --item.count,
          };
        }
        return item;
      }),
      uniqueProductsCount: this.state.cart.some(
        (e) => e.count === 0 && e.code === code
      )
        ? new Set(countLeftUniqueProducts(this.state.cart, code))
        : this.state.uniqueProductsCount.add(code),
      price: this.state.price - this.state.list[code - 1].price,
    });
  }
}

export default Store;
