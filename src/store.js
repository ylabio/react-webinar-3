class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set();
    this.nextCode = 1;

    if (initState.list) {
      initState.list.forEach(item => {
        this.usedCodes.add(item.code);
        if (item.code >= this.nextCode) {
          this.nextCode = item.code + 1;
        }
      });
    }
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
   * Генерация уникального кода
   * @returns {number}
   */
  generateUniqueCode() {
    let code = this.nextCode;
    while (this.usedCodes.has(code)) {
      code++;
    }
    this.usedCodes.add(code);
    this.nextCode = code + 1;
    return code;
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
      list: [
        ...this.state.list,
        {
          code: this.generateUniqueCode(),
          title: 'Новая запись',
          selected: false,
          selectionCount: 0, // Инициализируем счетчик выделений
        },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.usedCodes.delete(code); // Удаляем код из usedCodes
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, isMultiSelect = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected) {
            return { ...item, selected: false, selectionCount: item.selectionCount + 1 };
          } else {
            return { ...item, selected: true, selectionCount: item.selectionCount + 1 };
          }
        }
        return isMultiSelect ? item : { ...item, selected: false };
      }),
    });
  }
}

export default Store;