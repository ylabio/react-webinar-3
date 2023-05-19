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
   * Удаление продукта из корзины
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором сброшено количество товаров
      list: this.state.list.map(product => product.code === code ? {...product, count: 0} : product)
    })
  };

  /**
   * Добавление продукта в корзину
   * @param code
   */
  addItemToCart(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(product => {
        if (product.code === code) {
          // Добавление продукта
          return {
            ...product,
            count: product.count ? ++product.count : 1
          };
        }
        return product;
      })
    })
  }
}

export default Store;
