/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [], cart: [] }) {
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
    let newCart = [...this.state.cart];
    let existedPieceIndex = this.state.cart.findIndex(
      (piece) => piece.code === code
    );
    let itemObject = this.state.list.find((item)=> item.code === code);

    if (existedPieceIndex === -1) {
      newCart.push({
        ...itemObject,
        count: 1,
      })
    } else {
      newCart[existedPieceIndex].count += 1;
    };

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  /**
   * Удаление набора товаров из корзины
   * @param {Number} code - код товаров, который нужно удалить из корзины
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((piece) => piece.code !== code),
    });
  }
};

export default Store;
