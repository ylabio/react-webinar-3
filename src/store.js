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
   * Добавление нового товара в корзину
   * @param code
   */
  addItem(item) {
    let wasInBasket = false
    let newBasket = this.state.basket.map(element => {
      if (element.code == item.code) {
        wasInBasket = true
        return {...element, quantity: element.quantity + 1}
      }
      return element
    });
    if (!wasInBasket) {
      item["quantity"] = 1
      newBasket.push(item)
    }

    this.setState({
      ...this.state,
      basket: newBasket
    })
  };

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter(item => item.code !== code)
    })
  };

  /**
   * Открытие корзины
   */
  taggleBasket() {
    this.setState({
      ...this.state,
    basketIsOpened: !this.state.basketIsOpened
    })
  };
}

export default Store;
