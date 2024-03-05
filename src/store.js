import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = []; // Содержимое корзины
    this.state.isOpenModal = false; // Состояние модалки
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
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {
    const itemIndex = this.state.cart.findIndex(item => item.code === code);

    if (itemIndex !== -1) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item, index) => {
          if (index === itemIndex) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        })
      });
    } else {
      const newItem = this.state.list.find(item => item.code === code);

      if (newItem) {
        this.setState({
          ...this.state,
          cart: [...this.state.cart, { ...newItem, count: 1 }]
        });
      }
    }
  };

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  /**
   * Открывает или закрывает модалку в зависимости от параметра
   * @param isOpenModal 
   */
  setIsOpenModal(isOpenModal) {
    this.setState({
      ...this.state,
      isOpenModal
    })
  }
}

export default Store;
