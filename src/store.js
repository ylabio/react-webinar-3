import { generateCode } from "./utils";

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
   * Добавление товаров в корзину
   * @param position
   */

  addItemToBasket(position) {
    const itemPosition = this.state.basket.findIndex(
      (item) => item.title === position.title
    );
    if (itemPosition < 0) {
      const addedItem = {...position, count: 1}
      this.setState({
        ...this.state,
        basket: [...this.state.basket, addedItem],
        totalPrice: this.state.totalPrice + position.price,
        totalItems: this.state.totalItems + 1
      });
    } else {
      const changedItem = {...this.state.basket[itemPosition], count: this.state.basket[itemPosition].count + 1};
      this.setState({
        ...this.state,
        basket: [
          ...this.state.basket.slice(0, itemPosition),
          changedItem,
          ...this.state.basket.slice(itemPosition + 1),
        ],
        totalPrice: this.state.totalPrice + position.price,
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Удаление позиции товара из корзины
   * @param position
   */

  deleteItemFromBasket(position) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== position.code),
      totalPrice: this.state.totalPrice - position.price * position.count,
      totalItems: this.state.totalItems - 1
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
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
      }),
    });
  }
}

export default Store;
