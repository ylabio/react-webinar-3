/**
 * Хранилище состояния приложения
 */
class Store {
  basket;

  constructor(initState = {}) {
    initState = {
      ...initState,
      list: initState.list.map((item) => ({...item, count: 1})),// тут сразу форматирую входящие данные
    };
    this.basket = {items: [], totalPrice: 0, uniqItems: 0};
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
   * Установка состояния корзины
   * @param newBasket {Object}
   */
  setBasket(newBasket) {
    this.basket = newBasket;
    for (const listener of this.listeners) listener();
  }

  /**
   * Выбор состояния корзины
   * @returns {Object}
   */
  getBasket() {
    return this.basket;
  }

  /**
   * Добавление нового объекта в корзину
   * @param itemCode string
   */

  addItemToBasket(itemCode) {
    const newItemIndex = this.basket.items.findIndex(el => el.code === itemCode);

    if (newItemIndex !== -1) {
      const updatedItems = this.basket.items.map((el, index) => {
        if (index === newItemIndex) {
          return {...el, count: el.count + 1};
        }
        return el;
      });
      this.setBasket({
        ...this.basket,
        items: updatedItems,
        totalPrice: this.basket.totalPrice + updatedItems[newItemIndex].price,
        uniqItems: updatedItems.length
      });
    } else {
      const item = this.state.list.find(el => el.code === itemCode);
      if (item) {
        this.setBasket({
          ...this.basket,
          items: [...this.basket.items, {...item, count: 1}],
          totalPrice: this.basket.totalPrice + item.price,
          uniqItems: this.basket.uniqItems + 1
        });
      }
    }
  }

  /**
   * Удаление объекта из корзины
   * @param itemCode string
   */

  deleteItemFromBasket(itemCode) {
    const updatedItems = this.basket.items.filter(
      (item) => item.code !== itemCode
    );
    this.setBasket({
      ...this.basket,
      items: updatedItems,
      totalPrice: updatedItems.reduce(
        (total, item) => total + item.price * item.count,
        0
      ),
      uniqItems: new Set(updatedItems.map((item) => item.code)).size,
    });
  }
}

export default Store;
