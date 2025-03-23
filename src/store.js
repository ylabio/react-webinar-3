class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.afterNumber = (this.state.list?.length > 0) 
      ? Math.max(...this.state.list.map(item => item.code)) + 1 
      : 1; 
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
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.afterNumber, title: 'Новая запись',selectCount: 0 }],
     
    });
    this.afterNumber += 1;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param isCtrlPressed  флаг указывает на то Зажат ли ctrl
   */
  selectItem(code, isCtrlPressed = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        // Нажатие на себя = переключение состояния
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectCount += 1; // Увеличиваем счётчик выделений
          }
        }
        // Без ctrl убираем выделения
        else if (!isCtrlPressed) {
          item.selected = false;
        }
        return item;
        
      }),
    });
  }
}

export default Store;