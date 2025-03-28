import { generateCode } from './utils';

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
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  openCart() {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
  }

  // Закрыть модалку
  closeCart() {
    this.setState({
      ...this.state,
      isModalOpen: false,
    });
  }
  
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    // Фильтруем корзину, оставляя только товары с другим code
    const updatedCart = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: updatedCart, // Обновляем корзину только отфильтрованными данными
    });
  }


  addItemToCart(code) {
    
    const item = this.state.list.find((i) => i.code === code);
    if (!item) return;
  
    const quantity = item.count || 1;
  
    const existingCartItem = this.state.cart.find((c) => c.code === code);
  
    if (existingCartItem) {
      
      const updatedCart = this.state.cart.map((c) =>
        c.code === code
          ? { ...c, quantity: c.quantity + quantity }
          : c
      );
  
      this.setState({
        ...this.state,
        cart: updatedCart,
      });
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          {
            ...item,
            quantity,
          },
        ],
      });
    }
  }
  
}

export default Store;
