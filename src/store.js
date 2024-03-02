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
   * Удаление товара в корзине по коду
   * @param code
   */
  onAddToCardItem(code) {
    const existingBasketItem = this.state.baskets.find(item => item.code === code);

    if (existingBasketItem) {
      // Если элемент уже существует в корзине, увеличиваем его basketCount
      this.setState({
        ...this.state,
        baskets: this.state.baskets.map(item =>
          item.code === code ? { ...item, basketCount: item.basketCount + 1 } : item
        )
      });
    } else {
      // Если элемента нет в корзине, добавляем его с basketCount равным 1
      const listItem = this.state.list.find(item => item.code === code);
      if (listItem) {
        this.setState({
          ...this.state,
          baskets: [...this.state.baskets, { ...listItem, basketCount: 1 }]
        });
      }
    }
  }

  onDeleteToCardItem (code) {
    this.setState({
      ...this.state,
      baskets: this.state.baskets.filter(item => item.code !== code)
    })
  }

}

export default Store;
