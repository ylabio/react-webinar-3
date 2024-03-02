import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  basket;

  constructor(initState = {}) {
    initState = {
      ...initState,
      list: initState.list.map(item => ({...item, count: 1}))
    }
    this.basket = {items: [], totalPrice: 0, uniqItems: 0}
    this.state = initState
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

  setBasket(newBasket) {
    this.basket = newBasket;
    for (const listener of this.listeners) listener();
  }
  getBasket() {
    return this.basket;
  }

  addItemToBasket(item) {
    let newArr;
    const newItemIndex = this.basket.items.findIndex(el => el.code === item.code);
    if (newItemIndex !== -1) {
      newArr = this.basket.items.map((el, index) => {
        if (index === newItemIndex) {
          return { ...el, count: el.count + 1 };
        }
        return el;
      });
    } else {
      newArr = [...this.basket.items, item];
    }
    this.setBasket({
      ...this.basket,
      items: newArr,
      totalPrice: this.basket.totalPrice + item.price,
      uniqItems: new Set(newArr.map(item => item.code)).size
    });
  }


  /**
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };

  /**
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code)
  //   })
  // };

  /**
   * Выделение записи по коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? {...item, selected: false} : item;
  //     })
  //   })
  // }
}

export default Store;
