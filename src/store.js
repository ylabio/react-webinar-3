import { generateCode } from './utils';

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
   * Добавление продукта в корзину
   */
  addProductToBasket(code, title, price, count = 1) {
    const existingItem = this.state.productsBasket?.find(item => item.code === code);

    if (existingItem) {
      this.setState({
        ...this.state,
        productsBasket: this.state.productsBasket.map(item =>
          item.code === code ? { ...item, count: item.count + count } : item,
        ),
        productsPrice: this.state.productsPrice + price * count,
      });
    } else {
      this.setState({
        ...this.state,
        productsBasket: [...(this.state.productsBasket || []), { code, title, price, count }],
        productsPrice: (this.state.productsPrice || 0) + price * count,
      });
    }
  }

  /**
   * Удаление продукта из корзины по коду
   * @param code {string} Код товара
   */
  deleteProductFromBasket(code) {
    if (!this.state.productsBasket) return;

    const productIndex = this.state.productsBasket.findIndex(item => item.code === code);

    if (productIndex === -1) return;

    const productToRemove = this.state.productsBasket[productIndex];
    const newBasket = this.state.productsBasket.filter((_, index) => index !== productIndex);

    this.setState({
      ...this.state,
      productsBasket: newBasket,
      productsPrice:
        (this.state.productsPrice || 0) - productToRemove.price * productToRemove.count,
    });
  }
}

export default Store;
