/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.cart = [];
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
  getCart() {
    return this.cart;
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
  setCart(newState) {
    this.cart = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * @param item
   */
  addToCart(item) {
    const newCart = [...this.cart];
    const equalItem = newCart.find((elem) => elem.code === item.code); // Находим товар из State.list идентичный товару в корзине
    if (equalItem) {
      equalItem.count++; //Если идентичный товар есть, добавляем ему свойство count для подсчета колчиества одинаковых товаров
    } else {
      //Иначе просто добавляем в корзину
      const newItem = { ...item, count: 1 };
      newCart.push(newItem);
    }
    this.setCart(newCart);
  }
  deleteFromCart(item) {
    const newCart = [...this.cart];
    // Определяем индекс товара при нажатии
    const index = newCart.indexOf((elem) => elem.code === item.code);
    // И удаляем товар по индексу из массива
    newCart.splice(index, 1);
    this.setCart(newCart);
  }
}

export default Store;
