/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
	  this.state = initState
		this.listeners = [] // Слушатели изменений состояния
	}

	/**
	 * Подписка слушателя на изменения состояния
	 * @param listener {Function}
	 * @returns {Function} Функция отписки
	 */
	subscribe(listener) {
		this.listeners.push(listener)
		// Возвращается функция для удаления добавленного слушателя
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener)
		}
	}

	/**
	 * Выбор состояния
	 * @returns {Object}
	 */
	getState() {
		return this.state
	}

	/**
	 * Установка состояния
	 * @param newState {Object}
	 */
	#setState(newState) {
		this.state = newState
		// Вызываем всех слушателей
		for (const listener of this.listeners) listener()
	}

	/**
	 * Удаление элемента из корзины
	 * @param code
	 */
	deleteOnBasket(code) {
		this.#setState({
			...this.state,
			basket: this.state.basket.filter(item => item.code !== code),
		})
	}

	/**
	 * Добавление элемента в корзину
	 * @param code
	 */
	addToBasket(code) {
		const newItem = this.state.list.find(item => item.code === code);
    const foundItem = this.state.basket.find((item) => item.code === newItem.code);
    if(foundItem) {
      this.#setState({
        ...this.state,
        basket: [
          ...this.state.basket.filter((item) => item.code !== newItem.code),
          {...foundItem, count: foundItem.count + 1}
        ]
      });
    } else {
      this.#setState({...this.state, basket: [...this.state.basket, {...newItem, count: 1}]});
    }
  }

	/**
	 * Получение суммы корзины
	 */
	getTotalPrice() {
		return this.state.basket.reduce((sum,item) => sum + item.price * item.count, 0)
	}
}

export default Store
