import {countTotalPrice, generateCode} from "./utils";

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
   * Добавление новой записи пока что оставим, вдруг пригодится, хотя всегда можно достать из гитхаба
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteItemFromBasket(code) {
    const newListForBasket = this.state.listForBasket.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      listForBasket: newListForBasket,
      totalPrice: countTotalPrice(newListForBasket),
      totalNumberOfAddedItems: newListForBasket.length,
    })
  }

  /**
   * Добавление и увеличение товара в корзину
   * @param code
   */
  addItemToBasket(code) {
    let newListForBasket;
    // такая большая проверка была нужна для того, чтоб не изменять изначальный массив данных товаров
    if (this.state.listForBasket.some(item => item.code === code)) {
      newListForBasket = this.state.listForBasket.map(item => {
        if (item.code === code) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
    } else {
      newListForBasket = [
        ...this.state.listForBasket,
        {
          ...this.state.list.find(item => item.code === code),
          count : 1
        }
      ]
    }

    this.setState({
      ...this.state,
      listForBasket: [...newListForBasket],
      totalPrice: countTotalPrice(newListForBasket),
      totalNumberOfAddedItems: newListForBasket.length,
    })
  }
}

export default Store;
