import { plural } from './utils';

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
  countPrice() {
    this.setState({
      ...this.state,
      price: this.state.cart.reduce((acc, cur) => acc + cur.count * cur.price, 0),
    });
  }

  cartText() {
    this.countPrice();
    let text = 'Пусто';
    const amountProduct = this.state.cart.length;
    if (amountProduct > 0) {
      text =
        amountProduct +
        ' ' +
        plural(amountProduct, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        }) +
        ' / ' +
        this.state.price +
        ' ₽';
    }

    this.setState({
      ...this.state,
      text: text,
    });
  }
  showModalToggle() {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
    });
  }

  /**
   * Добавление новой записи
   */
  addItem(selectProduct) {
    const checkProductInCart = this.state.cart.find(
      cartProduct => cartProduct.code === selectProduct.code,
    );
    console.log(this.state.cart);

    if (!checkProductInCart) {
      selectProduct.count = 1;
      this.setState({
        ...this.state,
        cart: [...this.state.cart, selectProduct],
      });
    } else {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartProduct =>
          cartProduct.code === selectProduct.code ? { ...cartProduct, count: cartProduct.count + 1 } : cartProduct,
        ),
      });
    }
    this.cartText();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
    this.cartText();
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
