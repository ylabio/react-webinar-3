import { calculateCartPrice, generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;

    this.state.Cart ??= []; // es2020+. для деградации есть бабел или ts.config
    this.state.info ??= { goods: 0, price: 0 };

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
      this.listeners = this.listeners.filter(goods => goods !== listener);
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
   * Добавление товара в корзину
   * @param code
   */
  onAddGoods(code) {
    if (this.state.Cart.find((goods) => goods.code === code)) { //Если в корзине уже есть товар с таким code
      this.setState({
        ...this.state,
        Cart: this.state.Cart.map((goods) => {
          if (goods.code === code)
            return { ...goods, count: goods.count + 1 }
          return goods;
        }),
      });
    } else {// Если товара нет в корзине
      this.setState({
        ...this.state,
       Cart: this.state.Cart.concat({
          ...this.state.list.find(goods => goods.code === code),
          count: 1
        })
      });
    };
    this.setState({// Обновление 
      ...this.state,
      info: {
        goods: this.state.Cart.length,
        price: calculateCartPrice(this.state.Cart)
      }
    });
  }

  /**
  * Удаление товара из корзины
  * @param code
  */
  onDeleteGoods(code) {
    this.setState({
      ...this.state,
      Cart: this.state.Cart.filter(goods => goods.code !== code)
    });
    this.setState({
      ...this.state,
      info: {
        goods: this.state.Cart.length,
        price: calculateCartPrice(this.state.Cart)
      }
    });
  }
}

export default Store;