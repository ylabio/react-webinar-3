import { generateCode} from "./utils";

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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

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
        return item.selected ? {...item, selected: false} : item;
      })
    })
  };

  addItemToCart(code) {
    // Переделал функцию для добавления item теперь добавляется по коду
    // Теперь функция должна роботать быстрее потому что
    // в цикле происходит обход не всего массива, а только до нужного code
    const { cartList, list } = this.state;
    let updatedCartList = [...cartList];
    let itemUpdated = false; // Для отслеживания обновления элемента

    for (let i = 0; i < updatedCartList.length; i++) {
      if (updatedCartList[i].code === code) {
        updatedCartList[i].count++;
        itemUpdated = true;
        break;
      }
    }

    if (!itemUpdated) {
      const addedItem = list.find((obj) => obj.code === code);
      updatedCartList.push({ ...addedItem, count: 1 });
    }

    this.setState({
      ...this.state,
      cartList: updatedCartList,
      totalPrice: this.culcTotalPrice(updatedCartList),
      cartListLength: updatedCartList.length
    });
  };


  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(obj => obj.code !== item.code)
    })
    this.state.totalPrice = this.culcTotalPrice(this.state.cartList);
    this.state.cartListLength = this.state.cartList.length;
  };
  // перенёс функцию culcTotalPrice внутрь store

  culcTotalPrice = (items) => {
    return   items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
  }
}

export default Store;
