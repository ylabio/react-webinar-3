/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;
		this.listeners = []; // Слушатели изменений состояния

		// Добавляем счетчик выделений для каждого элемента списка
		this.state.list.forEach((item) => {
			item.selections = 0;
		});

		this.lastCode =
			initState.list.length > 0
				? Math.max(...initState.list.map((item) => item.code))
				: 0; // Последний использованный код
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
		const newCode = ++this.lastCode; // Увеличиваем  значение на 1, а затем присваиваем полученное значение переменной
		const newItem = { code: newCode, title: 'Новая запись', selections: 0 }; // Создаем новую запись и устанавливаем selections в 0
		this.setState({
			...this.state,
			list: [...this.state.list, newItem], // Добавляем новый объект в массив, учитывая предыдущие
		});
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code, event) {
		event.stopPropagation(); // Предотвращаем всплытие события
		const newList = this.state.list.filter((item) => item.code !== code); // Немного модифицируем, перенесём фильтрацию в переменную
		this.setState({
			...this.state,
			list: newList,
		});
	}

	/**
	 * Увеличение счетчика выделений для элемента по его коду
	 * @param code {number} Код элемента
	 */
	incrementSelections(code) {
		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				if (item.code === code) {
					item.selections += 1;
				}
				return item;
			}),
		});
	}

	/**
	 * Сброс счетчика выделений для всех элементов списка
	 */
	resetSelections() {
		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				item.selections = 0;
				return item;
			}),
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
				} else if (item.selected) {
					item.selected = false;
				}
				return item;
			}),
		});
	}
}

export default Store;
