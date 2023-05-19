import {generateCode, plural} from "./utils";

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
      cart: this.state.cart.filter(item => item.code !== code)
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
   * Добавление новой записи в корзину
   */
  addToCart(item) {

    if(this.state.cart.filter(el => el.code === item.code).length){
      return this.setState({
        ...this.state,
        cart: this.state.cart.map(el => {
          if (el.code === item.code) {
            return {
              ...el,
              count: el.count + 1,
            };
          }
          return el;
        })
      })
    }

    this.setState({
      ...this.state,
      cart: [...this.state.cart, {...item, count: 1}]
    })
  };
  /**
   * Расчитывает общее количество и итоговую сумму
   * @returns {Object}
   */
  getCartInfo(){
    const count = this.state.cart.reduce((sum, item) => item.count + sum, 0)
    const totalPrice = this.state.cart.reduce((sum, item) => (item.price * item.count) + sum, 0)
    return {count, totalPrice}
  }

}

export default Store;
