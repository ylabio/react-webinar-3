

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

  addToCart(code) {
    const cart = this.state.CartList; // Получил текущую корзину и записал её в cart
    // let newTotal = this.state.totalPrice; // Получил текущую сумму 
    let changedInCart = []; // Массив для новой корзины

    if (cart.findIndex(
      (itemCart) => itemCart.code === code) !== -1) { // Если в корзине уже есть товар
        changedInCart = cart.map((p) =>
        p.code === code
          ? {
              ...p,
              amountCart: p.amountCart + 1, // к нашему товару прибавляем +1
            }
          : p
      );
    } else {
      changedInCart = [...cart, { ...this.state.list[code-1], amountCart: 1 }]; // если нашего товара нет, добавляем его и ставим в количество значением 1
    }


      let total = 0;
      changedInCart.map((item) => {
        total = total + item.price*item.amountCart;
      })
      const newTotal = total;

    this.setState({
      ...this.state,
      CartList: changedInCart, // заменяем старую на новую
      totalPrice: newTotal
    });
  }

  deleteItem(code) { // Удаление товара из корзины
    const cart = this.state.CartList;
    const newCart = cart.filter((i) => i.code !== code);
    let total = 0;
    newCart.map((item) => {
      total = total + item.price*item.amountCart;
    })
    const newTotal = total;

    this.setState({
      ...this.state,
      CartList: newCart,
      totalPrice: newTotal
    });
  }

}


export default Store;
