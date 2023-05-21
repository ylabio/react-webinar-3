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
  }

  /**
   * Переключение видимости корзины
  */
  toggleCartView() {
    this.setState({
      ...this.state, 
      cart: {
        ...this.state.cart,
        isOpen: !this.state.cart.isOpen
      }
    });
  }

  /**
   * Добавление в корзину
  */
  addToCart(code) {
    const cart = this.state.cart;
    const addedProduct = cart.items.find((product) => code == product.code);
    const product = this.state.list.find((product) => code == product.code);

    if (addedProduct) {
      this.setState({
        ...this.state, 
        cart: {
          ...cart,
          items:  cart.items.map((product) => {
            if (product.code === code) {
              return {
                ...product,
                count: product.count + 1,
              };
            }
            return product;
          }),
          totalPrice: cart.totalPrice + product.price
        }
      })
    }
    else {
      this.setState({
        ...this.state, 
        cart: {
          ...cart,
          items: [...this.state.cart.items, {...product, count: 1}],
          totalCount: cart.totalCount + 1,
          totalPrice: cart.totalPrice + product.price}
        })
    }
  };

  /**
   * Удаление из корзины
  */
  deleteCartItem(code) {
    const cart = this.state.cart;
    const product = cart.items.find((product) => code == product.code);

    this.setState({
      ...this.state, 
      cart: {
        ...cart,
        items: 
          cart.items.filter((product) => product.code !== code),
        totalCount: cart.totalCount - 1,
        totalPrice: cart.totalPrice - product.price * product.count
      }
    });
  };
}

export default Store;
