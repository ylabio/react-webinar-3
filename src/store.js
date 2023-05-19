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
  renderBasket() {
    this.setState({
      ...this.state,
      render: this.state.shoppingСart.render = this.state.shoppingСart.render ? false : true
    })
  };

  /**
   * Добавления запись в корзину
   * @param elArr
   */
  addToBasket(elArr) {
    let newObj = elArr;
 

    /** 
     * Проверяет наличия обьекта в массиви и если находит добавляет единицу в
     * @param cound
     * Иначе добавляет новый объект с 
     * @param cound
    */

    let add = (elArr) => {
      if(this.state.shoppingСart.shoppingList.indexOf(elArr) != -1 && elArr.cound >= 1) {
        for(let arr = 0; arr <= this.state.shoppingСart.shoppingList.length; arr++) {
          if(elArr.code == this.state.shoppingСart.shoppingList[arr].code) {
            return this.state.shoppingСart.shoppingList[arr].cound += 1;
          }
        }  
      } else {
        newObj.cound = 1;
        this.state.shoppingСart.shoppingList.push(newObj)
      }
    }
    
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      price: this.state.shoppingСart.price += elArr.price,
      shoppingList: add(elArr)
    })
  };

  deleteItem(code) {
    let del = (el) => {

      if(el.cound == 1) {
        this.state.shoppingСart.shoppingList = [...this.state.shoppingСart.shoppingList].filter(item => item.code != code.code)
      } else {
        this.state.shoppingСart.shoppingList.filter(item => {
          if(el.code == item.code && el.cound > 1) {
            item.cound -= 1
          }
        })
      }
      
    }

    this.setState({
      ...this.state,
      price: this.state.shoppingСart.price -= code.price,
      shoppingList: del(code)
    })
  };

}

export default Store;
