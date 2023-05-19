import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = [];
    this.state.totalAmount = 0;
    this.state.totalCount = 0;
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
  //addItem() {
    //this.setState({
      //...this.state,
      //list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    //})
 // };

  /**
   * Удаление записи по коду
   * @param code
   */
  addItem(code) {
   // this.setState({
     // ...this.state,
      // Новый список, в котором не будет удаляемой записи
      //list: this.state.list.filter(item => item.code !== code)
    //})
    this.setState({
      ...this.state,
      cart: this.state.cart.some((item) => item.code === code) 
      ? this.state.cart.map((item) => {
          if(item.code === code){
            return {...item, count: item.count + 1}
          }else{ return {...item}} 
        })
      :
        [...this.state.cart, {...this.state.list.find((item) => item.code === code), count: 1}],
        totalAmount: this.state.totalAmount + this.state.list.find((item) => item.code === code).price,
        totalCount: this.state.totalCount + 1
    })
  };

  deleteItem(code){
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalAmount: this.state.cart.reduce((previous, item) => {
        if(item.code !== code){ 
          return (previous + item.count * item.price)
         }else{
          return previous
        }
      }, 0),
      totalCount: this.state.cart.reduce((previous, item) => {
        if(item.code !== code) {
          return (previous + item.count)
          }else{ return previous
        }
      }, 0)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  /*selectItem(code) {
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
  }*/
}

export default Store;
