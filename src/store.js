import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      products: [],
      active: false,
      totalPrice: 0,
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
   * Добавление новой записи
   */
  addToCartItem(item) {
    const isItemExist = this.state.products.some(
      (product) => product.code === item.code
    );
    if (isItemExist) { console.log('срабатывает при повторном клике на тот же самый товар ' + isItemExist)
      const updatedProducts = this.state.products.map((product) => {
        if (product.code === item.code) {
          return { ...product, count: product.count + 1 };
          //console.log(product);
        } else {
          return product;
        }
      });
      this.setState({
        ...this.state,
        products: updatedProducts,
      });
    } else {
      item.count = 1;
      this.setState({
        ...this.state,
        products: [...this.state.products, item],
      });
    }
    this.calcTotalPrice();
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      products: this.state.products.filter(item => item.code !== code)
    })
    this.calcTotalPrice();
  };

  openModal() {
    this.setState({
      ...this.state,
      active: true,
    });
  };

  closeModal() {
    this.setState({
      ...this.state,
      active: false,
    });
  };

  calcTotalPrice() {
    let totalPrice = 0;
    this.state.products.forEach((product) => {
      totalPrice += product.count * product.price;
    });
    this.setState({
      ...this.state,
      totalPrice: totalPrice.toLocaleString("ru-RU"),
    });
  };

}

export default Store;
