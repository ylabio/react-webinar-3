/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set(this.state.list.map(item => item.code)); // Список использованных кодов
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
   * Добавление новой записи с оригинальными кодами
   */
  addItem() {
    let nextCode = 1; // Счетчик кодов
    while (this.usedCodes.has(nextCode)) {
      nextCode++;
    }

    this.usedCodes.add(nextCode);

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: nextCode, title: 'Новая запись' }]
    });
  }

  /**
   * Удаление записи по коду
   * @param code {Number}
   * @param e {Event}
   * @returns {Object}
   */
  deleteItem(code, e) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code {Number}
   * @param e {Event}
   * @returns {Object}
   */
  selectItem(code, e) {
    const isCtrlPressed = e.ctrlKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        // Инициализируем количество выделений равным 0
        if (item.selectionCount === undefined) {
          item.selectionCount = 0;
        }

        if (isCtrlPressed) {
          if (item.code === code) {
            const newSelectedState = !item.selected;
            // Вычисляем количество выделений
            if (newSelectedState) {
              return { ...item, selected: newSelectedState, selectionCount: item.selectionCount + 1 };
            } else {
              return { ...item, selected: newSelectedState, selectionCount: item.selectionCount };
            }
          }
          return item;
        } else {
          return {
            ...item,
            selected: item.code === code,
            selectionCount: item.code === code ? item.selectionCount + 1 : item.selectionCount
          }
        }
      }),
    });
  }
};

export default Store;
