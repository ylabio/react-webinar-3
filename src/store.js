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
			this.listeners = this.listeners.filter((item) => item !== listener);
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

	/**
	 * Добавление товара в корзину
	 * @param item
	 */
	addToCart(item) {
		if (!this.state.cart.find((cartItem) => cartItem.code === item.code)) {
			this.setState({
				...this.state,
				cart: [...this.state.cart, {...item, count: 1}],
			});
		} else {
			this.state.cart.find((cartItem) => cartItem.code === item.code).count++;
		}

		this.countCart();
	}

	/**
	 * Удаление товара
	 * @param code
	 */
	deleteItem(code) {
		const product = this.state.cart.find((cartItem) => cartItem.code === code);
		if (product.count > 1) {
			this.state.cart.find((cartItem) => cartItem.code === code).count--;
		} else {
			this.state.cart = this.state.cart.filter(
				(cartItem) => cartItem.code !== code
			);
		}

		this.countCart();
	}

	/**
	 * Подсчет суммы в корзине
	 */
	countCart() {
		this.setState({
			...this.state,
			cartSum: this.state.cart.reduce(
				(sum, item) => sum + item.price * item.count,
				0
			),
		});
	}
}

export default Store;
