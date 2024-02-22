/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = []; // Слушатели изменений состояния
		this.deletedCodes = []; // Массив удаленных кодов
		this.selectionCounts = {}; // Счетчик выделенных элементов
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
	 * Генератор уникального кода
	 */
	generateNewCode() {
		const itemCount = this.state.list.length + this.deletedCodes.length;
		return itemCount + 1;
	}

	/**
	 * Добавление новой записи с новым уникальным кодом
	 */
	addItem() {
		let newCode = this.generateNewCode();

		this.setState({
			...this.state,
			list: [
				...this.state.list,
				{
					code: newCode,
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
		// Добавляем удаленный код в массив удаленных кодов
		this.deletedCodes.push(code);

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
		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				if (item.code === code) {
					item.selected = !item.selected;

					// Увеличиваем количество выделений при выделении элемента
					if (item.selected) {
						this.selectionCounts[code] =
							(this.selectionCounts[code] || 0) + 1;
					}
				} else {
					item.selected = false;
				}
				return item;
			}),
		});
	}

	/**
	 * Получение количества выделений для заданной записи
	 */
	getSelectionCount(code) {
		return this.selectionCounts[code] || 0;
	}
}

export default Store;
