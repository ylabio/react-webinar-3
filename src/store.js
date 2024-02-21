/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState
		this.listeners = [] // Слушатели изменений состояния
		this.newMaxCode = 0
		this.defaultMaxCode = 0
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
	 * Генератор уникального номера записи
	 */
	generateCode() {
		this.defaultMaxCode = Math.max(...this.state.list.map(i => i.code))
		if (this.newMaxCode > this.defaultMaxCode) return this.newMaxCode + 1
		return this.defaultMaxCode + 1
	}

	/**
	 * Добавление новой записи
	 */
	addItem() {
		let newCode = this.generateCode()
		if (newCode > this.newMaxCode) this.newMaxCode = newCode
			this.setState({
				...this.state,
				list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
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
	 * В app.js перенес onClick для выделения в др div,
	 * так как был баг (при удалении снималось выделение с записи)
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					return { ...item, selected: !item.selected }
				} else {
					return { ...item, selected: false }
				}
			}),
		})
	}
}

export default Store;
