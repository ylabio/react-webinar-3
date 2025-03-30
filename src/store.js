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

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteItem(code) {
    const newProductList = this.state.cart.products.filter(item => item.code !== code);
    const fullPrice = this.getFullPrice(newProductList);
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        products: newProductList,
        fullPrice,
      }
    });
  }

  addToCart(code) {
    let newProductList;
    const isInCart = this.state.cart.products.find(product => product.code === code);
    // проверка: если предмет уже есть в корзине, увеличивается его count
    // если нет - в корзину добавляется новый предмет
    if (isInCart) {
      newProductList = this.state.cart.products.map(product => {
        return {
          ...product,
          count: product.code === code ? product.count + 1 : product.count,
        };
      });
    } else {
      const newItem = this.state.list.find(product => product.code === code);
      newProductList = [...this.state.cart.products, { 
        code: newItem.code,
        price: newItem.price,
        title: newItem.title,
        count: 1 
      }];
    }
    const fullPrice = this.getFullPrice(newProductList);
    this.setState({
      ...this.state,
      cart: {
        products: newProductList,
        fullPrice,
      }
    });
  }

  getFullPrice(cart) {
    return cart.reduce((sum, item) => {
      return sum + (item.count * item.price);
    }, 0);
  }
}

export default Store;
