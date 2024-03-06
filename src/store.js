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
   * @param {Object} item - объект товара, который нужно добавить в корзину
   */
  addItem(item) {
    let newCart = [...this.state.cart];
    let existedPieceIndex = this.state.cart.findIndex(
      (piece) => piece.title === item.title
    );

    if (existedPieceIndex === -1) {
      newCart.push({
        ...item,
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
   * @param {Object} item - объект товаров, который нужно удалить из корзины
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((piece) => piece.code !== item.code),
    });
  }
}

export default Store;
