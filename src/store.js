/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
	this.state = {
		...initState,
		list: initState.list.map(item => ({ ...item, selectionCount: 0 })) // Добавляем свойство selectionCount для подсчёта выделений
	  };
    this.listeners = []; // Слушатели изменений состояния

	// Инициализируем lastCode на основе существующих элементов в initState.list, если они есть
	this.lastCode = initState.list && initState.list.length > 0 
	? Math.max(...initState.list.map(item => item.code)) 
	: 0;
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
	// Увеличиваем lastCode на 1 для генерации уникального кода для новой записи
	const newCode = ++this.lastCode;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newCode, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(e, code) {
    e.stopPropagation() // предотвращаем всплытие, чтобы не снималось выделение
    this.setState({
      ...this.state,
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
          item.selected = !item.selected;
		  
		  if (item.selected) { // Если пункт был выделен, увеличиваем счётчик
            item.selectionCount = (item.selectionCount || 0) + 1;
          }
        } else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
