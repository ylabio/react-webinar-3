import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    // this.sum = 0;
    // this.shoppingCartCount = 0;
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
   * Добавление товара в корзину
   */

  addItemShoppingCart(code) {
    this.setState({
      ...this.state,
      shoppingCartArr: !this.state.shoppingCartArr.some(
        (el) => el.code === code
      )
        ? [
            ...this.state.shoppingCartArr,
            {
              ...this.state.list.filter((el) => el.code === code)[0],
              count: 1,
            },
          ]
        : [
            ...this.state.shoppingCartArr.map((el) => {
              if (el.code === code) {
                return { ...el, count: el.count + 1 };
              } else {
                return el;
              }
            }),
          ],
    });
    this.state.sumShoppingCart = this.state.shoppingCartArr.reduce(
      (accumulator, currentValue, index, array) => {
        return accumulator + currentValue.price * currentValue.count;
      },
      0
    );
    this.state.shoppingCartCount = this.state.shoppingCartArr.length;
    console.log(this.state);
  }

  /**
   * Удаление записи по коду
   * @param code
   */

  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      shoppingCartArr: this.state.shoppingCartArr.filter(
        (item) => item.code !== code
      ),
    });
    this.state.sumShoppingCart = this.state.shoppingCartArr.reduce(
      (accumulator, currentValue, index, array) => {
        return accumulator + currentValue.price * currentValue.count;
      },
      0
    );
    this.state.shoppingCartCount = this.state.shoppingCartArr.length;
    console.log(this.state);
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
