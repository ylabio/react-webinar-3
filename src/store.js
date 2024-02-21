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
    // Генерируем уникальный код для новой записи
    let newItemCode = 1;
    const uniqueCodes = this.state.list.map(item => item.code);
    while (uniqueCodes.includes(newItemCode)) {
      newItemCode++;
    }
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newItemCode, title: 'Новая запись', selectionCount: 0}]
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
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Увеличиваем счетчик выделений
          item.selectionCount += 1;
          // Отменяем выделение для уже выделенных элементов
          if (item.selected) {
            item.selected = false;
          } else {
            // Сбрасываем выделение у других записей
            this.state.list.forEach(otherItem => {
              if (otherItem.code !== code && otherItem.selected) {
                otherItem.selected = false;
              }
            });
            // Выделяем текущий элемент
            item.selected = true;
          }
        }
        return item;
      })
    });
  }
}

export default Store;
