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
   * Добавление товара в корзину
   */
  addItemToCart (code) {
    // проверяем есть ли в корзине товар с таким же кодом
    // присваиваем переменной i индекс товара в корзине, если товара нет то i = -1
    const i = this.state.cart.cartList.findIndex((item) => item.code === code);
    
	if (i === -1) {
      this.setState({...this.state, cart:{
		  ...this.state.cart,
		  cartList: [ ...this.state.cart.cartList, {...this.state.list.filter((item) => item.code === code)[0], count: 1}],}
		});
	  } else {
		this.setState({
			...this.state, cart:{
				...this.state.cart,
				cartList: this.state.cart.cartList.map(item => {
					if (item.code === code) {
						return {
						...item,
						count: item.count + 1,
						};
					}
					return item;
				})
			}
		})
    }
	this.setTotalPrice();
  }
	/**
	 * Подсчет общей суммы
	 */
	setTotalPrice() {
		const totalPrice = this.state.cart.cartList.reduce((sum, item) => (item.price * item.count) + sum, 0)
		this.setState({...this.state,
			cart:{
				...this.state.cart,
				totalPrice: totalPrice
			}
		});
	}

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
	this.setState({
		...this.state, cart:{
		  ...this.state.cart,
		  cartList: [...this.state.cart.cartList.filter(item => item.code !== code)],
	}});
	this.setTotalPrice();
  };
}

export default Store;
