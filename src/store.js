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
   * Add item to the cart
   * stores only unique entires in the state
   * and adds new prop count
   * 
   * @param code
   */  
  addToCart(code) {
    // find added item in the list
    let unique = true;
    // if cart is empty, returns empty array. If new item is already in the store,
    // increment count prop
    const newCart = this.state.cart.map(item => {
      if (item.code === code) {
        item = {...item, count: item.count + 1};
        unique = false;
      }
      return item;
    });

    // 
    const newCartItem = this.state.list.find(product => product.code === code);
    if (newCartItem && unique) {
      newCartItem.count = 1;
      newCart.push(newCartItem);
    }    

    this.setState({
      ...this.state,
      cart: [...newCart]
    });

    this.caclCartSummary();
  };

  /**
   * Calculate cart total sum and item count
   */
  caclCartSummary() {
    const cart = this.state.cart;

    this.setState({
      ...this.state,
      cartSummary: {
        cartCount: cart.reduce((sum, cur) => sum + cur.count, 0),
        cartUniqueCount: cart.length,
        cartSum: cart.reduce((sum, cur) => sum + (cur.price * cur.count), 0)
      }
    });
  }

  /**
   * Delete item from the cart by code
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });

    this.caclCartSummary();
  };
  

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
}

export default Store;
