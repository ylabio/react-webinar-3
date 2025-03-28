// import { generateCode } from './utils';

import { sumProduct } from './utils';

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



    addBasket(code){
      let check = true;
      for(const product of this.state.basket){
        if(product.code == code){
          check = false;
          product.quantity = product.quantity + 1;
         
        }
      }
      if(check){
        this.setState({
          ...this.state,
         
        basket: [...this.state.basket, { code: code, title: this.state.list[code - 1].title, price: this.state.list[code - 1].price, quantity: 1 }],
  
        });
      }else{
        this.setState({
          ...this.state,
         
        basket: [...this.state.basket],
   
        });
      }  
      this.setState({
        ...this.state,
      result: [sumProduct(this.state.basket), this.state.basket.length],  
      });
  
    }


      deleteBasket(code){
          this.setState({
            ...this.state,
           
            basket: this.state.basket.filter(item => item.code !== code),
          });
    
          this.setState({
            ...this.state,
          result: [sumProduct(this.state.basket), this.state.basket.length],  
          });

        }

}

export default Store;
