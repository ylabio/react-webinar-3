/**
 * Хранилище состояния приложения
 */
class Store {
  basket;

  constructor(initState = {}) {
    initState = {
      ...initState,
      list: initState.list.map((item) => ({...item, count: 1})),
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
   * @param item {Object}
   */
  addItemToBasket(item) {
    let newArr;
    const newItemIndex = this.basket.items.findIndex(
      (el) => el.code === item.code
    );
    if (newItemIndex !== -1) {
      newArr = this.basket.items.map((el, index) => {
        if (index === newItemIndex) {
          return {...el, count: el.count + 1};
        }
        return el;
      });
    } else {
      newArr = [...this.basket.items, item];
    }
    this.setBasket({
      ...this.basket,
      items: newArr,
      totalPrice: this.basket.totalPrice + item.price,
      uniqItems: new Set(newArr.map((item) => item.code)).size,
    });
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
