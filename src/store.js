import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}, initBasketState = { list: [], totalCount: 0, totalSum: 0 }) {
    this.state = initState;
    this.listeners = [];
    this.basketState = initBasketState;
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
   * Выбор состояния корзины
   * @returns {Object}
   */
  getBasketState() {
    return this.basketState;
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
   * Установка состояния корзины
   * @param newBasketState {Object}
   */
  setBasketState(newBasketState) {
    this.basketState = newBasketState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addBasketItem(code) {
    const itemToAdd = this.state.list.find(item => item.code === code);
    if (itemToAdd) {
      const newList = [...(this.basketState.list || []), { ...itemToAdd }];
      this.setBasketState(this.calculateBasketStats(newList));
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const newList = this.basketState.list.filter(item => item.code !== code);
    this.setBasketState(this.calculateBasketStats(newList));
  }

  /**
   * Расчет статистики корзины
   * @param list {Array} Список товаров
   * @returns {Object} Новое состояние корзины
   */
  calculateBasketStats(list) {
    const itemCounts = list.reduce((acc, item) => {
      acc[item.code] = (acc[item.code] || 0) + 1;
      return acc;
    }, {});

    const uniqueItems = list.filter((item, index, self) =>
      index === self.findIndex((i) => i.code === item.code)
    );

    const totalSum = uniqueItems.reduce((sum, item) => {
      return sum + (item.price * itemCounts[item.code]);
    }, 0);

    return {
      list,
      totalCount: list.length,
      totalSum,
      itemCounts, // если нужно сохранить количество каждого товара
      uniqueItems // если нужно сохранить уникальные товары
    };
  }
}

export default Store;
