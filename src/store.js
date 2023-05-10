/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState
		this.listeners = [] // Слушатели изменений состояния
		this.lastCode = initState.list.reduce((acc, curr) =>
			acc.b > curr.b ? acc : curr
		).code // Последний уникальный код, берем максимальный, а не последний т.к. коды изначально могут идти не по порядку
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
	setState(newState) {
		this.state = newState
		// Вызываем всех слушателей
		for (const listener of this.listeners) listener()
	}

	/**
	 * Добавление новой записи
	 */
	addItem() {
		// this.lastCode++

		this.setState({
			...this.state,
			list: [
				...this.state.list,
				{
					code: ++this.lastCode,
					title: "Новая запись",
				},
			],
		})
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter(item => item.code !== code),
		})
	}

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					item.selected = !item.selected

					if (item.selected) {
						item.selectedCount
							? (item.selectedCount += 1)
							: (item.selectedCount = 1)
					}
				} else {
					item.selected = false
				}
				return item
			}),
		})
	}
}

export default Store
