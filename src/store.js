/**
 * Хранилище состояния приложения
 */
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
          selectionCount: 0,
        },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.usedCodes.delete(code);
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    const isCtrlPressed = e.ctrlKey || e.metaKey;

    if (e.target.tagName === 'BUTTON') {
      return;
    }

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (
            item.selected &&
            this.state.list.filter(item => item.selected).length > 1 &&
            !isCtrlPressed
          ) {
            item.selected = true;
          } else {
            item.selected = !item.selected;
            item.selectionCount += item.selected ? 1 : 0;
          }
        } else if (!isCtrlPressed) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
