import { generateCode } from './utils';

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

  addProductToBasket(newProduct) {
    // Проверка на наличие добавляемого товара в корзине
    this.state.basketList.find(product => product.code === newProduct.code) 
    ? this.setState({
        ...this.state,
        basketList: this.state.basketList.map(product => {
          if(product.code === newProduct.code) {
            // Увеличиваем у соответствующего товара количество
            return {
              ...product,
              quantity: product.quantity + 1
            }
          }
          return product
        })
      })
    : this.setState({
        ...this.state,
        basketList: [
          ...this.state.basketList, 
          {...newProduct, quantity: 1}  
          // если товара в корзине не оказалось, то добавляем его и устанавливаем количество равным 1
        ]   
      }) 
  }

  deleteProductFromBasket(product) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемого товара
      basketList: this.state.basketList.filter(item => item.code !== product.code),
    });
  }
}

export default Store;
