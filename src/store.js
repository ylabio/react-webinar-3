/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.cart = {
      list: [
       {
          code: 1,
          count: 2,
          title: "Название товара",
          price: 100.0,
          totalPrice: 200,
        }, {
          code: 3,
          count: 1,
          price: 23,
          title: "Конфета",
          totalPrice: 23,
        }
      ],
      totalPrice: 223,
    };
    this.isViewModal = false;
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
   * Выбор состояния корзины товаров
   * @returns {Object}
   */
  getCartState() {
    return this.cart;
  }

  /**
   * Установка состояния корзины товаров
   * @param newCartState {Object}
   */
  setCartState(newCartState) {
    this.cart = newCartState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  setTotalCartPrice(totalPrice) {
    this.cart = {
      ...this.cart,
      totalPrice,
    };
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  setViewModal(isModalOpen) {
    this.isViewModal = isModalOpen;
  }

  /**
   * Добавление товара в корзину
   * @param itemCode {Number}
   */
  addItemToCart(itemCode) {
    let cartList = [];
    const isHasItemInCart = this.cart.list.some(item => item.code === itemCode);
    if (isHasItemInCart) {
      cartList = this.cart.list.map(item => {
        if (item.code === itemCode) {
          return {...item, count: item.count + 1, totalPrice: item.price * (item.count + 1)};
        }
        return {...item};
      });
    } else {
      const defaultItem = {...this.state.list.filter(item => item.code === itemCode)[0]};
      cartList = [...this.cart.list, {...defaultItem, count: 1, totalPrice: defaultItem.price}];
    }

    this.setCartState({
      ...this.cart,
      list: cartList,
    });
    this.setTotalCartPrice(this.cart.list.reduce((acc, cur) => acc + cur.totalPrice, 0));
  }

  /**
   * Удаление записи по коду
   * @param itemCode {Number}
   */
  deleteItemFromCart(itemCode) {
    this.setCartState({
      ...this.cart,
      list: [...this.cart.list.filter(item => item.code !== itemCode)],
    });
    this.setTotalCartPrice(this.cart.list.reduce((acc, cur) => acc + cur.totalPrice, 0));
  }

  changeViewModal() {
    this.setViewModal(!this.isViewModal);
  }
}

export default Store;
