import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cardInfo = {
      cardList: [],
      cardTotalCost:0,
      cardNum : 0,
    }
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
   * Добавление товара в коризину
   */
  addItemToCard(code) {
    const quaOrOne =  this.state.cardInfo.cardList.find(el => el.code === code)?.quantity || 0; //Если уже есть в корзине количество иначе 0
    const newCardList = [...this.state.cardInfo.cardList.filter(el => el.code !== code),{...this.state.list.find(el => el.code === code) , quantity : quaOrOne+1}];
    this.setState({
      ...this.state,
      cardInfo: {
        cardList: newCardList,
        cardNum : newCardList.length,
        cardTotalCost : newCardList.reduce((total, el) => total + el.price * el.quantity, 0)
      }
    })
  };

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  removeItemFromCard(code) {
    const newList = this.state.cardInfo.cardList.filter((el) => el.code !== code);
    this.setState({
      ...this.state,
      cardInfo:{
        cardList : newList,
        cardNum : newList.length,
        cardTotalCost : newList.reduce((total, el) => total + el.price * el.quantity, 0)
      }
    })
  };

}

export default Store;
