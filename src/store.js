import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.cartProducts = []
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

  getCartProducts() {
    return this.cartProducts
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
  }

  addToCart(product) {
    const find = this.state.cartProducts.find(el => el.code === product.code)
    if(find) {
      this.setState({
        ...this.state,
        cartProducts: this.state.cartProducts.map(item => {
          if (item.code === product.code) {
            return {
              ...item,
              count: item.count + 1
            }
          }else {
            return item
          }
        })
      })
    }else {
      this.setState({
        ...this.state,
        cartProducts: [...this.state.cartProducts, {...product, count: 1}]
      })
    }
  }

  removeFromCart(code) {
    const product = this.state.cartProducts.find(el => el.code === code)
    if (product?.count > 1) {
      this.setState({
        ...this.state,
        cartProducts: this.state.cartProducts.map(item => {
          if (item.code === code) {
            return {...item, count: item.count - 1}
          }else {
            return item
          }
        })
      })
    }else {
      this.setState({
        ...this.state,
        cartProducts: this.state.cartProducts.filter(i => i.code !== code)
      })
    }
  }
}

export default Store;
