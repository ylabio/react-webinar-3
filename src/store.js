

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
	 * Выбор состояния
	 * @returns {boolean}
	 */

	/**
	* Открыть/Закрыть карзину
	*/
	toggleCart() {
		let newCartOpen;
		if (this.state.cartOpen) {
			newCartOpen = false
		} else { newCartOpen = true }

		this.setState({
			...this.state,
			cartOpen: newCartOpen
		});
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
	 * Добавление в карзину
	 */
	addToCart(code) {
		const newCartList = [...this.state.cartList];
		const newList = [...this.state.list];
		const index = newCartList.findIndex(item => item.code === code);
		const indexHad = newList.findIndex(item => item.code === code);
		if (index > -1) {
			newCartList.splice(index, 1, { ...newCartList[index], quant: newCartList[index].quant + 1 })
		} else {
			newCartList.push({ ...newList[indexHad], quant: 1 })
		}
		const summary = newCartList.reduce((summ, item) => summ += item.price * item.quant, 0);
		this.setState({
			...this.state,
			cartSummary: summary,
			cartList: newCartList,
		})
	};

	/**
 * Удаление item по коду из карзины
 * @param code
 */
	deleteFromCart(code) {
		this.setState({
			...this.state,
			// Новый список, в котором не будет удаляемой записи
			cartList: this.state.cartList.filter(item => item.code !== code)
		});
		const summary = this.state.cartList.reduce((summ, item) => summ += item.price * item.quant, 0);
		this.setState({
			...this.state,
			cartSummary: summary,
		});
	};

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			// Новый список, в котором не будет удаляемой записи
			list: this.state.list.filter(item => item.code !== code)
		})
	};

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					// Смена выделения и подсчёт
					return {
						...item,
						selected: !item.selected,
						count: item.selected ? item.count : item.count + 1 || 1,
					};
				}
				// Сброс выделения если выделена
				return item.selected ? { ...item, selected: false } : item;
			})
		})
	}
}

export default Store;
