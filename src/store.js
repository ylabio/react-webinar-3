import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cartList: []};
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
  
  /**
   * Открытие модального окна
   */
  openModal() {
    this.setState({
        ...this.state,
        isModalOpen: true
    });
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
      this.setState({
          ...this.state,
          isModalOpen: false
      });
  }

   /**
   * Добавление новой записи в корзину
   * @param code
   */
   addCartItem(code) {
    const selectedItem = this.state.list.find(item => item.code === code);
    const existingCartItemIndex = this.state.cartList.findIndex(item => item.code === code);

    if (existingCartItemIndex !== -1) {
      const updatedCartList = this.state.cartList.map((item, index) => {
        if (index === existingCartItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      this.setState({
        ...this.state,
        cartList: updatedCartList
      });
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, { ...selectedItem, quantity: 1 }]
      });
    }
  };

 /**
 * Удаление записи из корзины
 * @param code
 */
 deleteCartItem(code) {
  this.setState({
    ...this.state,
    cartList: this.state.cartList.filter(item => item.code !== code)
  })
  }
}

export default Store;
