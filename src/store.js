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
   * Добавление товара в корзину
   * @param item
   */
  addItemBasket(item) {
    if (this.state.BasketList.filter(i => item.code == i.code).length == 0){
      this.setState({
        ...this.state,
        BasketList: [...this.state.BasketList, {code:item.code,title:item.title,count:1,price:item.price}]
      })
    }
    else{
      this.setState({
        ...this.state,
         BasketList:this.state.BasketList.map((i,index) => {
          if (item.code == i.code){
            return {...i,count: i.count + 1};
          }
          return this.state.BasketList[index];
            
        })
      })
    }
    this.changePriceAndCount();
  }

  /**
   * Удаление товара из карзины
   * @param item
   */
  deleteItemBasket(item){
    // if (item.count > 1){
    //   this.setState({
    //     ...this.state,
    //      BasketList:this.state.BasketList.map((i,index) => {
    //       if (item.code == i.code){
    //         return {...i,count: i.count - 1};
    //       }
    //       return this.state.BasketList[index];
            
    //     })
    //   })
    // }
    
    this.setState({
      ...this.state,
        BasketList:this.state.BasketList.filter((i,index) => {
        if (item.code !== i.code){
          return this.state.BasketList[index];
        }
      })
    })
    this.changePriceAndCount();
    
    
  }

  changePriceAndCount() {   
    this.setState({
      ...this.state,
        ListInfo:[{sum:this.state.BasketList.reduce((acc,curr) => acc + (curr.price*curr.count),0),count:this.state.BasketList.length}]
    })
    
  }

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
}

export default Store;
