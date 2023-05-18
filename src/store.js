import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cartItems: [], totalPrice: 0 };
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
   * Рассчитывает общую стоимость товаров в корзине
   * @returns {number} - Общая стоимость
   */
  calculateTotalPrice() {
    const { cartItems } = this.state;
    let totalPrice = 0;

    for (const item of cartItems) {
      totalPrice += item.price * item.count;
    }

    return totalPrice;
  }

  /**
   * Добавление товара в корзину
   * @param item {Object} - добавляемый товар
   */
  addToCart(item) {
    const cartItems = [...this.state.cartItems]; // Создаем новый массив

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.code === item.code);

    if (existingItemIndex !== -1) {
      // Если товар уже существует в корзине, увеличиваем его количество
      cartItems[existingItemIndex].count++;
    } else {
      // Иначе, добавляем новый товар в корзину
      const newItem = {
        code: item.code,
        title: item.title,
        count: 1,
        price: item.price
      };
      cartItems.push(newItem);
    }

    // Обновляем состояние с новым массивом cartItems
    this.setState({ ...this.state, cartItems });

    // Обновляем состояние totalPrice
    const totalPrice = this.calculateTotalPrice();
    this.setState({ ...this.state, totalPrice });
  }


  /**
   * Удаление товара из корзины по коду
   * @param code {string} - код удаляемого товара
   */
  removeFromCart(code) {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cartItems: updatedCartItems
    });

    // Обновляем состояние totalPrice
    const totalPrice = this.calculateTotalPrice();
    this.setState({ ...this.state, totalPrice });
  };

}

export default Store;
