import {generateCode} from "../utils";

/**
 * Хранилище состояния приложения
 */
class ShopStore {
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

  getPrice(code) {
    var vPrice = 0;
    if (this.state.list.length > 0) {
    this.state.list.map(item => {
      if (item.code === code) {
        vPrice = item.price;
        return vPrice;
      }
    }
    )
    }
    return vPrice;
  };

  /**
   * Добавление новой записи
   */
  addItem(code) {
    var vChange = false;
    if (this.state.listBasket.length > 0) {
    this.state.listBasket.map((item) => {
      if (item.code === code) {
        item.qproduct += 1;
        vChange = true;
      }
    })}
    if (vChange == true) {
      this.setState({
        ...this.state,
        listBasket: this.state.listBasket.filter(item => true)
      })
      return;
    }
    this.setState({
      ...this.state,
      listBasket: [...this.state.listBasket, {code: code, qproduct: 1}]
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
      listBasket: this.state.listBasket.filter(item => item.code !== code)
    })
  };

  amountPrice() {
    var vAmount = 0;
    if (this.state.listBasket.length > 0) {
    this.state.listBasket.map(item => {
      if (item.qproduct > 0) {
        vAmount += (item.qproduct * this.getPrice(item.code));
      }
    }
    )
    }
    return vAmount;
  };

  amountProduct() {
    return this.state.listBasket.length;
  }
}

export default ShopStore;
