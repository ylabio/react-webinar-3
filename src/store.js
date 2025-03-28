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

  // Подсчет стоимости корзины
  countPrice() {
    this.setState({
      ...this.state,
      price: this.state.cart.reduce((acc, cur) => acc + cur.count * cur.price, 0),
    });
  }

  // Формирование строки для кнопки корзины
  formCartText() {
    this.countPrice();
    let text = "Пусто";
    let len = this.state.cart.length;
    if (len > 0) {
      text = len + " " + plural(len, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      }) + " / " + this.state.price + " ₽";
    }
    
    this.setState({
      ...this.state,
      text: text,
    });
  }

  /**
   * Добавление новой записи
   * @param elem
   */
  addItem(elem) {
    let e1 = this.state.cart.find(item => item.code === elem.code);
    
    if (e1 === undefined) {
      elem.count = 1;
      this.setState({
        ...this.state,
        cart: [...this.state.cart, elem],
      });
    } else {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item =>
          item.code === elem.code ? {...item, count: item.count + 1} : item
        ),
      });
    }
    this.formCartText();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    });
    this.formCartText();
  }

  // Показать/скрыть корзину
  showModalToggle() {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
    });
  }
}

export default Store;
