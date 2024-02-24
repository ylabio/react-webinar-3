/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = {
			...initState,
			list: initState.list.map((item) => ({ ...item, selectionCount: 0 })),
		};
		this.listeners = []; // Слушатели изменений состояния
		this.lastId = Math.max(...this.state.list.map((item) => item.code), 0);
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
		this.lastId += 1;
		this.setState({
			...this.state,
			list: [
				...this.state.list,
				{ code: this.lastId, title: 'Новая запись', selectionCount: 0 },
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
	selectItem(code) {
		const updatedList = this.state.list.map((item) => {
			if (item.code === code) {
				return {
					...item,
					selected: !item.selected,
					selectionCount: item.selected
						? item.selectionCount
						: item.selectionCount + 1,
				};
			} else {
				return {
					...item,
					selected: false,
				};
			}
		});

		this.setState({ list: updatedList });
	}
}

export default Store;
