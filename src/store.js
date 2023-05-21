import { formatNumbers, generateCode } from "./utils";

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

  /**
   * Сумма всех цен товаров в корзине
   */
  countAllPrices() {
    const res = this.state.basket.reduce((acc, currentItem) => {
      if (currentItem.count > 1) {
        return acc + currentItem.price * currentItem.count;
      }

      return acc + currentItem.price;
    }, 0);

    const basketAmount = formatNumbers(res, {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    });

    this.setState({
      ...this.state,
      basketAmount,
    });
  }

  /**
   * Переключение видимости модального окна
   * @param {Boolean} status
   */
  setModalOpenStatus(status) {
    this.setState({
      ...this.state,
      modalOpenStatus: status,
    });
  }

  /**
   * Добавление товара в корзину
   * @param {Number} code
   */
  addItemToBasket(code) {
    // не смог додумать способ без изменения item, а также не смог придумать,
    // как уменьшить сложность алгоритма.
    const item = this.state.list.filter((a) => a.code === code)[0];
    item.count = ++item.count || 1;

    if (item.count > 1) {
      const newIndex = this.state.basket.findIndex((a) => a.code === code);
      const newArr = this.state.basket.slice();
      newArr[newIndex].count = item.count;

      this.setState({
        ...this.state,
        basket: newArr,
      });

      this.countAllPrices();

      return;
    }

    this.setState({
      ...this.state,
      basket: [...this.state.basket, { ...item }],
    });
    this.countAllPrices();
  }

  /**
   * Удаления товара из корзины
   * @param {Number} code
   */
  deleteItemFromBasket(code) {
    const newBasket = this.state.basket.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      basket: newBasket,
    });

    this.countAllPrices();
  }
}

export default Store;
