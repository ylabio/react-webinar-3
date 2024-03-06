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
  addItem(code) {
		let item = this.state.list.find(el=>el.code===code)
		let productItem=this.state.productsList.find(el=>el.code===code)
		if(productItem){
			this.setState({
				...this.state,
				productsList: this.state.productsList.map(el=>el.code===code?{...el,count:el.count+1}:el)
			})
		}
    else{
			this.setState({
				...this.state,
				productsList: [...this.state.productsList, {
          code:item.code,
          title:item.title,
          price:item.price,
          count:1
        }]
			})
		}
		this.accumProducts()
  };
	/**
   * Подсчет покупок
   */
	accumProducts(){
		let count = this.state.productsList.length
		let price = this.state.productsList.reduce((accum,el)=>accum+el.price*el.count,0)
		this.setState({
			...this.state,
			productCount:count,
			totalProductPrice:price
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
      productsList: this.state.productsList.filter(item => item.code !== code)
    })
		this.accumProducts()
  };
}

export default Store;
