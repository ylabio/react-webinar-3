import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.cart = [];
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
   * Выбор корзины
   * @returns {Object}
   */
  getCart() {
    return this.cart;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setCart(newCart) {
    this.cart = newCart;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину
   */
  addToCart(newItem) {
    let itemIndexInCart = -1;
    this.cart.forEach((item, ind) => {
      if (newItem.code === item.code) {
        itemIndexInCart = ind;
      }
    });

    if (itemIndexInCart >= 0) {
      this.cart[itemIndexInCart].amount += 1;
      //this.setCart(this.cart)
      return this.cart;
    } else {
      this.cart.push({ ...newItem, amount: 1 });
      return this.cart;
      //this.setCart([...this.cart, { ...newItem, amount: 1 }]);
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(item) {
    this.cart = this.cart.filter(cur => cur.code !== item.code);
    
    return this.cart;
  }

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
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
