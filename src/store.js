import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния   
    this.totalSumCart = 0; //
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
      orders: this.state.orders.filter(item => {
        if (item.code !== code) {          
          return item
        }  
        this.totalSumCart -=  item.price * item.total;     
      })
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

  addToOrder(code) {       
    this.state.list.map(item => {
      if (item.code === code) {  
        if (!this.state.orders.some(el => el.code === item.code))
        {
          this.setState({
            ...this.state,
            orders: [...this.state.orders, {code: item.code, title: item.title, price: item.price, total: 1}]      
          })  
          this.totalSumCart +=  item.price;      
        }       
        else  
        {
          this.setState({
            ...this.state,
            orders: this.state.orders.filter(value => {
              if (value.code === item.code) {       
                this.totalSumCart +=  value.price;                
                return {...value, total: value.total++}          
              }     
              return value 
            })                   
          })      
        }  
      }
    })
  }
}

export default Store;
