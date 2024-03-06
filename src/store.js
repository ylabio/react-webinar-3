import {generateCode} from "./utils";

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
  addItem(item) {

    const product = this.state.basket.list.some(
      (product) => product.code === item.code
    );

    if (product) {
      const updateItem = this.state.basket.list.map((obj) => {
        if (obj.code === item.code) {
          return { ...obj, count: obj.count + 1 };
        }
        return obj;
      });

      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          list: [
            ...updateItem
          ]
        }});
      } else {
        const newItem = { ...item, count: 1 };

      this.setState({
        ...this.state,
        basket: {
          ...this.state.basket,
          list: [
            ...this.state.basket.list,
            newItem
          ]
        }});
    }
    this.#calculatePrice()
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        list: [...this.state.basket.list.filter(item => item.code !== code)]
      }
    })

    this.#calculatePrice()
  };

   #calculatePrice() {
    const sum = this.state.basket.list.reduce(
      (prev, item) => prev + (item.count * item.price), 0) || 0;

    this.setState({
      ...this.state,
      basket: {
        ...this.state.basket,
        totalPrice: sum
      }
    })
  }

}

export default Store;
