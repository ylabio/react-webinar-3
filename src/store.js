import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.totalPrice = 0;
    this.products = [];
    this.listeners = [];
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

  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись" },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const list = this.state.list.filter((item) => item.code !== code);
    const newList = list.map((item) => {
      if (item.code > code) {
        item.code--;
      }
      return item;
    });
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  setTotalPrice(newTotalPrice) {
    this.totalPrice = newTotalPrice;
    for (const listener of this.listeners) listener();
  }

  setProducts(newProducts) {
    this.products = newProducts;
    for (const listener of this.listeners) listener();
  }

  deleteProduct(deletedProduct) {
    this.products.map((product) => {
      if (product.code === deletedProduct.code) {
        this.setTotalPrice(this.totalPrice - deletedProduct.price * product.count);
      }
    });
    this.setProducts(
      this.products.filter((product) => product.code !== deletedProduct.code)
    );
  }

  addProduct(newProduct) {
    const isNewProduct = this.products.find(
      (product) => product.code === newProduct.code
    );

    if (!isNewProduct) {
      this.setProducts([...this.products, { ...newProduct, count: 1 }]);
      this.setTotalPrice(this.totalPrice + newProduct.price);
    } else {
      const newProducts = this.products.map((product) => {
        if (product.code === newProduct.code) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
      this.setProducts(newProducts);
      this.setTotalPrice(this.totalPrice + newProduct.price);
    }
  }
}

export default Store;
