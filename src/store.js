import {addOverflowToBody} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      cart: {
        list: [],
        totalPrice: 0,
        totalProductCount: 0,
      },
      isViewModal: false,
      ...initState,

    };
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
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  listenersCall() {
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Установка состояния корзины товаров
   * @param newCartList {Object}
   */
  setCart(newCartList) {
    const productsCount = newCartList.length;
    const totalAmount = newCartList.reduce((acc, cur) => acc + cur.totalPrice, 0)

    this.state = {
      ...this.state,
      cart: {
        ...this.state.cart,
        list: [...newCartList],
        totalPrice: totalAmount,
        totalProductCount: productsCount,
      },
    };

    this.listenersCall();
  }

  setViewModal(isModalOpen) {
    this.state = {
      ...this.state,
      isViewModal: isModalOpen
    };

    addOverflowToBody(isModalOpen);
    this.listenersCall();
  }


  /**
   * Добавление товара в корзину
   * @param itemCode {Number}
   */
  addItemToCart(itemCode) {
    let cartList = [];
    const isHasItemInCart = this.state.cart.list.some(item => item.code === itemCode);

    if (isHasItemInCart) {
      cartList = this.state.cart.list.map(item => {
        if (item.code === itemCode) {
          return {...item, count: item.count + 1, totalPrice: item.price * (item.count + 1)};
        }
        return {...item};
      });
    } else {
      const defaultItem = {...this.state.list.filter(item => item.code === itemCode)[0]};

      cartList = [...this.state.cart.list, {...defaultItem, count: 1, totalPrice: defaultItem.price}];
    }

    this.setCart(cartList);
  }

  /**
   * Удаление записи по коду
   * @param itemCode {Number}
   */
  deleteItemFromCart(itemCode) {
    const cartList = [...this.state.cart.list.filter(item => item.code !== itemCode)];

    this.setCart(cartList);
  }

  changeViewModal() {
    const isShowModal = !this.state.isViewModal;

    this.setViewModal(isShowModal);
  }
}

export default Store;
