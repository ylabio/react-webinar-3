import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.basket = {
      products: [],
      allPrice: 0,
      productsCount: 0,
    }, // массив с товарами, добавленными в корзину
      this.state.modalIsOpen = true,
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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
    })
  };

  /**
   * Добавление товара в корзину по code
   * @param code
   */
  addBasketItem(code) {
    const basketItem = this.state.basket.products.find((item) => item.code === code);
    const listItem = this.state.list.find(item => item.code === code);
    this.setState({
      ...this.state,
      basket: {
        products: !basketItem ?
          [
            ...this.state.basket.products, { ...listItem, count: 1 }
          ]
          :
          this.state.basket.products.map((item) => {
            if (item.code === code) {
              return {
                ...item,
                count: item.count + 1,
              }
            }
            return item;
          }),
        allPrice: this.state.basket.allPrice + listItem.price,
        productsCount: !basketItem ? this.state.basket.productsCount + 1 : this.state.basket.productsCount,
      },
    })
  };

  /**
   * Удаление товара из корзины по code
   * @param code
   */
  deleteBasketItem(code) {
    const item = this.state.basket.products.find((item) => item.code === code);
    this.setState({
      ...this.state,
      basket: {
        products: this.state.basket.products.filter((item) => item.code !== code),
        allPrice: this.state.basket.allPrice - item.price * item.count,
        productsCount: this.state.basket.productsCount - 1,
      }
    })
  };

  /**
   * Открыть/закрыть модальное окно
   *
   */
  setActiveModal() {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      })
    })
  }
}
export default Store;
