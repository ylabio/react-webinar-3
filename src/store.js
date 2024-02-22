/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
	  this.state = initState;
	  this.listeners = []; // Слушатели изменений состояния
	  this.currentCode = this.state.list.length + 1;
	  this.selectCounts = this.state.list.reduce((acc, item) => ({ ...acc, [item.code]: 0 }), {});
	}
  
	generateUniqueCode() {
	return this.currentCode++;
	}
  
	getSelectCounts() {
	  return this.selectCounts;
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
	addItem() {
	  this.setState({
		...this.state,
		list: [...this.state.list, {code: this.generateUniqueCode(), title: 'Новая запись'}]
	  })
	}
  
	/**
	 * Удаление записи по коду
  * @param code
	 */
	deleteItem(code) {
	  this.setState({
		...this.state,
		list: this.state.list.filter(item => item.code !== code)
	  });
	}
  
	/**
	 * Выделение записи по коду
  * @param code
	 */
  selectItem(code) {
	  const list = this.state.list.map(item => ({
		...item,
		selected: item.code === code ? !item.selected : false
	  }));
	
	  this.setState({ list });
	
	  const item = list.find(item => item.code === code);
	
	  if (item && item.selected) {
		if (this.selectCounts[code] > 0) this.notifySelectCount(code);
		this.selectCounts[code] = (this.selectCounts[code] || 0) + 1;
	  }
	}
	
  
	notifySelectCount(code) {
	  const count = this.selectCounts[code];
	  alert(`Выделяли ${count} раз.`);
	}
  }
  
  export default Store;
  