/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.cartList = {list: []}; // Корзина товаров
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
   * Выбор состояния корзины
   * @returns {Object}
   */
  getCartItems() {
    return this.cartList;
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
   * @param newState 
   */
  setCart(newState) {
    this.cartList = newState;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  addInCart(item) {
    this.setCart({
      ...this.cartList,
      list: [...this.cartList.list, item],
    })
  };

  /**
   * Переключатель функций
   * @param item 
   */
  toggle(item) {
    // Проверяем наличие элемента в списке
    if (this.cartList.list.includes(item)) {
      item.count++;
      this.setCart(this.cartList);
    } else {
      item.count = 1;
      this.addInCart(item);
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItem(item) {
    this.setCart({
      ...this.cartList,
      // Новый список, в котором не будет удаляемой записи
      list: this.cartList.list.filter(i => i !== item)
    })
  };

}

export default Store;
