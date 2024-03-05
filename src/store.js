import {generateCode} from "./utils";
import {logPlugin} from "@babel/preset-env/lib/debug";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.basket = [];
    this.isModalOpen = false;
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


  goToBasketItem() {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      isModalOpen: false,
    });
  }


  addToBasketItem(itemToAdd) {
    const existingItemIndex = this.basket.findIndex(item => item.code === itemToAdd.code);
    if (existingItemIndex !== -1) {
      this.basket[existingItemIndex].quantity += 1;
    } else {
      const newItem = { ...itemToAdd, quantity: 1 };
      this.basket.push(newItem);
    }
    for (const listener of this.listeners) listener();
  }

  getBasket() {
    if (this.basket) {
      let finalPrice = this.basket.reduce((acc, item) => {return acc + item.price * item.quantity}, 0)
      return {basket: this.basket, itemsCount: this.basket.length, finalPrice};
    } else {
      return {basket: 0, itemsCount: 0, finalPrice: 0};
    }
  }

  deleteItem(code) {
    this.basket = this.basket.filter(item => item.code !== code);
    for (const listener of this.listeners) listener();
  }
}


export default Store;
