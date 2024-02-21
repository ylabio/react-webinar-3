class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.initSelectionCount();
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

  initSelectionCount() {
    this.state.list.forEach(item => {
      if (!item.selectionCount) {
        item.selectionCount = 0;
      }
    });
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
    let newItemCode;
    do {
      // Генерируем случайное число от 1 до 1000000
      newItemCode = Math.floor(Math.random() * 100) + 1;
    } while (this.state.list.some(item => item.code === newItemCode)); // Проверяем уникальность кода
  
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newItemCode, title: 'Новая запись', selectionCount: 0 }]
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  User
  
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Проверяем, выделен ли уже элемент
          if (!item.selected) {
            // Увеличиваем счетчик выделений только если элемент только что выделен
            item.selectionCount += 1;
          }
          // Выделяем текущий элемент или снимаем выделение
          item.selected = !item.selected;
        } else if (item.selected) {
          // Снимаем выделение у других записей, если они были выделены ранее
          item.selected = false;
        }
        return item;
      })
    });
  }
  
  
}

export default Store;

/*

// Генерируем уникальный код для новой записи
    let newItemCode;
    do {
      // Генерируем случайное число от 1 до 1000000
      newItemCode = Math.floor(Math.random() * 100) + 1;
    } while (this.state.list.some(item => item.code === newItemCode)); // Проверяем уникальность кода
*/