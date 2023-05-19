import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = [];
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
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };

  deleteCartEl(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((el) => el.code !== code),
    });
  }

  //deleteItem заменяем на addCartItem, добавление записи в корзину
  /**
   * Удаление записи по коду
   * @param code
   */
  addCartItem(newCartItem) {
    // Добавляем товар в корзину
    // Проверить корзину, есть ли там тот товар который мы добавляем
    // Если есть то увеличить count, если нет то добавить
    // Итоговый массив объектов корзины:
    // {code: generateCode(), title: 'Название товара', price: 100.0, count: 1},
    // {code: generateCode(), title: 'Название товара2', price: 222.0, count: 4}
    const isItemAdded = this.state.cart.some(
      (item) => item.code === newCartItem.code
    );
    if (isItemAdded) {
      console.log("item ADDED");
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartEl) => {
          if (cartEl.code === newCartItem.code) {
            return {
              ...cartEl,
              count: cartEl.count + 1,
            };
          }
          return cartEl;
        }),
      });
    } else {
      console.log("item NOT ADDED");
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...newCartItem, count: 1 }],
      });
    }
    console.log(this.state.cart);
  }
}

export default Store;
