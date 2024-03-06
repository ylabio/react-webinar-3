

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

  addToCart(item) {
    const cart = this.state.CartList; // Получил старую корзину и записал её в cart

    let changedInCart = []; // Массив для новой корзины

    if (cart.findIndex(
      (itemCart) => itemCart.code === item.code) !== -1) { // Если в корзине уже есть товар
        changedInCart = cart.map((p) =>
        p.code === item.code
          ? {
              ...p,
              amountCart: p.amountCart + 1, // к нашему товару прибавляем +1
            }
          : p
      );
    } else {
      changedInCart = [...cart, { ...item, amountCart: 1 }]; // если нашего товара нет, добавляем его и ставим в количество значением 1
    }
    console.log(changedInCart)
    this.setState({
      ...this.state,
      CartList: changedInCart, // заменяем старую на новую
    });
  }

  deleteItem(item) { // Удаление товара из корзины
    const cart = this.state.CartList;
    const newCart = cart.filter((i) => i.code !== item.code);

    this.setState({
      ...this.state,
      CartList: newCart,
    });
  }

}


export default Store;
