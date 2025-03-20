/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = this._checkState(initState);
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Проверка корректности данных состояния -
   * проверяет уникальность числовых кодов, гарантирует что есть код (положительное число) и тайтл (строка),
   * иные данные считаются некорректными и отбрасываются.
   *
   * @param checkedState {Object} - Проверяемый объект состояния
   * @returns {Object} - Обработанный объект состояния
   */
  _checkState(checkedState) {
    const defaultState = { list: [], lastCode: 0 };

    if (!Array.isArray(checkedState.list) || checkedState.list.length === 0) {
      return defaultState;
    }

    const codeSet = new Set();
    let maxCode = 0;
    const validItems = [];

    checkedState.list.forEach((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return;

      const hasValidCode = typeof item.code === 'number' && item.code > 0;
      const hasValidTitle = typeof item.title === 'string' && item.title.trim().length > 0;
      const isUniqueCode = !codeSet.has(item.code);

      if (hasValidCode && hasValidTitle && isUniqueCode) {
        codeSet.add(item.code);
        if (item.code > maxCode) maxCode = item.code;
        validItems.push({ code: item.code, title: item.title });
      }
    });

    return { list: validItems, lastCode: maxCode };
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
   * @param newState {Object} - Новый объект состояния
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
    const nextCode = this.state.lastCode + 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: nextCode, title: 'Новая запись' }],
      lastCode: nextCode,
    });

  }

  /**
   * Удаление записи по коду
   * @param code {number} - Код элемента
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Переключает выделение элемента
   * @param code {number} - Код элемента
   * @param isMultiSelect {boolean} - Флаг группового выделения
   */
  selectItem(code, isMultiSelect) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }  else if (!isMultiSelect) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
