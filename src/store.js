/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [], cart: [], cartTotalPrice: 0, cartItemsCount: 0 }) {
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
   * @returns {Object} - возвращает объект state хранилища
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param {Object} newState
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param {Number} code - код товара, который нужно добавить в корзину
   */
  addItem(code) {
    let existedPieceIndex = this.state.cart.findIndex(
      (piece) => piece.code === code
      );
    let itemObject = this.state.list.find((item)=> item.code === code);

    if (existedPieceIndex === -1) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {
          ...itemObject,
          count: 1,
        }],
        cartTotalPrice: this.state.cartTotalPrice + itemObject.price,
        cartItemsCount: this.state.cartItemsCount + 1,
      })
    } else {
      let updatedCart = [...this.state.cart];
      updatedCart[existedPieceIndex] = {
        ...updatedCart[existedPieceIndex],
        count: updatedCart[existedPieceIndex].count + 1,
      };
      this.setState({
        ...this.state,
        cart: [...updatedCart],
        cartTotalPrice: this.state.cartTotalPrice + itemObject.price,
      })
    }
  }

  /**
   * Удаление набора товаров из корзины
   * @param {Number} code - код товаров, который нужно удалить из корзины
   */
  deleteItem(code) {
    const itemToDelete = this.state.cart.find((piece) => piece.code === code);

    this.setState({
      ...this.state,
      cart: this.state.cart.filter((piece) => piece.code !== code),
      cartTotalPrice: this.state.cartTotalPrice - (itemToDelete.price * itemToDelete.count),
      cartItemsCount: this.state.cartItemsCount - 1,
    });
  }
};

export default Store;
