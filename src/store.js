import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state = {
      ...initState,
      basket: [],
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
  //Добавление товаров в корзину
  addBasketItem(code) {
    const selectItem = this.state.list.find((item) => item.code === code);
    //Если товар уже есть в корзине
    if (this.state.basket.find((item) => item.code === code)) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
      this.updatedPrice();
    } else {
      //Если товара нет в корзине добавляем свойство count
      const itemBasket = {
        ...selectItem,
        count: 1,
      };
      this.setState({
        ...this.state,
        basket: [...this.state.basket, itemBasket],
      });
      this.updatedPrice();
    }
  }
  // Подсчет суммы товаров
  sumPriceItem() {
    let sumPrice = 0;
    this.state.basket;
    for (let i = 0; i < this.state.basket.length; i++) {
      sumPrice += this.state.basket[i].price * this.state.basket[i].count;
    }
    return sumPrice;
  }
  // Подсчет кол-ва товаров
  sumCountItem() {
    let sumCount = 0;
    /* this.state.basket;
    for (let i = 0; i < this.state.basket.length; i++) {
      sumCount += this.state.basket[i].count;
    } */
    return sumCount = this.state.basket.length;
  }
  // Обновление значения сумм
  updatedPrice() {
    this.setState({
      ...this.state,
      sumPrice: this.sumPriceItem(),
      sumCount: this.sumCountItem(),
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
  handleClickDelete(code) {
    this.setState({
      ...this.state,
      // Новый список корзины, в котором не будет удаляемой записи
      basket: this.state.basket.filter((item) => item.code !== code),
    });
    this.updatedPrice();
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
