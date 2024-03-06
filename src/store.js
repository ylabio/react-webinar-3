import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cartList: [], totalCartPrice: 0};
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
    document.body.style.overflow = "hidden";
    
    this.setState({
        ...this.state,
        isModalOpen: true
    });
  }

  /**
   * Закрытие модального окна
   */
  closeModal() {
    document.body.style.overflow = "";
    
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
    const updatedTotalCartPrice = this.state.totalCartPrice + selectedItem.price;


    if (existingCartItemIndex !== -1) {
      const updatedCartList = this.state.cartList.map((item, index) => {
        if (index === existingCartItemIndex) {
          return { ...item, quantity: item.quantity + 1, totalPrice: item.price * (item.quantity + 1) };
        }
        return item;
      });

      this.setState({
        ...this.state,
        cartList: updatedCartList,
        totalCartPrice: updatedTotalCartPrice
      });
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, { ...selectedItem, quantity: 1 }],
        totalCartPrice: updatedTotalCartPrice
      });
    }
  };

 /**
 * Удаление записи из корзины
 * @param code
 */
 deleteCartItem(code) {
  let updatedTotalCartPrice = this.state.totalCartPrice;
  const updatedCartList = this.state.cartList.filter(item => {
    if(item.code !== code){
      return true;
    } else {
      updatedTotalCartPrice -= item.totalPrice;
      return false;
    }
  })

  this.setState({
    ...this.state,
    cartList: updatedCartList,
    totalCartPrice: updatedTotalCartPrice
  })
  }

}

export default Store;
