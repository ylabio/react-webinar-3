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

  /**
   * Открытие модального окна
   */
  openModal() {
    this.setState({
      ...this.state,
      modal: true
    })
  };

  /**
   * Закрытие модального окна
   */
  closeModal() {
    this.setState({
      ...this.state,
      modal: false
    })
  };

  /**
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {
    const newItem = this.state.list.find(item => item.code === code);
    let uniqItem = true;

    if (this.state.cartList) {
      const newCartList = this.state.cartList.map(item => {
        if (item.code === code) {
          uniqItem = false;
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })

      if (uniqItem) {
        newCartList.push({ ...newItem, quantity: 1 });
      }

      this.setState({
        ...this.state,
        cartList: newCartList,
        totalCartPrice: newCartList.reduce((a, b) => a + (b.price * b.quantity), 0),
      })

    } else {
      this.setState({
        ...this.state,
        cartList: [{ ...newItem, quantity: 1 }],
        totalCartPrice: newItem.price
      })
    }
  };
}

export default Store;
