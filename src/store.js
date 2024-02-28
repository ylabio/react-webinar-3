/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = [];
		this.newCode = initState.list.length;
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
	 * Добавление новой записи
	 */
	addItem() {
		this.newCode += 1;
		this.setState({
			...this.state,
			newCode: this.state.newCode + 1,
			list: [
				...this.state.list,
				{
					code: this.newCode,
					title: 'Новая запись',
				},
			],
		});
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter((item) => item.code !== code),
		});
	}

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(e, code) {
		if (e.target.closest('.Item-actions')) return;

		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				if (item.code === code && !item.selected) {
					item.selected = !item.selected;
					item.selectedCount = item.selectedCount ? item.selectedCount + 1 : 1;
				} else {
					item.selected = false;
				}
				return item;
			}),
		});
	}
}

export default Store;
