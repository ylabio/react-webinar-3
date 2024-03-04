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

  /**
 * Добавление в корзину
 * @param code
 */
  addToCart(code) {
    const updatedCart = this.state.cart.map(item => {
      if (item.code === code) {
        item.counter = item.counter ? item.counter + 1 : 1;
        this.setState({
          ...this.state,
          cart: this.state.basketList
        })
      } else {
        this.setState({
          ...this.state,
          cart: [...this.state.basketList, {...item, count: 1}]
        })
      }
    });

    if (!updatedCart.find(item => item.code === code)) {
      updatedCart.push({code: code, counter: 1, price: price});
    }

    this.setState({
      ...this.state,
      cart: updatedCart
    });

    // Пересчитываем общую цену и обновляем состояние
    const totalPrice = this.countPrice();
    this.setState({
      ...this.state,
      totalPrice: totalPrice
    });
  }


  //подсчет количества товара в корзине
  countCart() {
    const {cart} = this.state;
    if (!cart) return 0; // Если cart не определен, возвращаем 0
    return [...new Set(cart)].length; // Уникальные товары в корзине
  }

  //подсчет цены каждого товара добавленного в корзину
  countPrice() {
    const {cart} = this.state;
    if (!cart || !cart.length) return 0; // Если cart не определен или пуст, возвращаем 0
    return cart.reduce((totalPrice, currentItem) => totalPrice + (currentItem.price), 0);
  }
  // countPrice() {
  //   const { cart } = this.state;
  //   if (!cart || !cart.length) return 0; // Если cart не определен или пуст, возвращаем 0
  //   return cart.reduce((totalPrice, currentItem) => totalPrice + (currentItem.counter * currentItem.price), 0);
  //   // Подсчитываем общую стоимость товаров, умножая цену каждого товара на его счетчик и складывая все значения
  // }
}

export default Store;
