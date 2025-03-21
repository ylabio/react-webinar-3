/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      selectedItems: new Set(), // Множество выделенных элементов
      selectionCounts: {}, // Счётчики выделений для каждого элемента
      maxCode: Math.max(...initState.list.map(item => item.code), 0), // Максимальный использованный код
    };
    this.listeners = []; // Слушатели изменений состояния
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
    const newCode = this.state.maxCode + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      maxCode: newCode,
    });
  }

  /**
   * Удаление записи по коду
   * @param code {number}
   */
  deleteItem(code) {
    const newSelectedItems = new Set(this.state.selectedItems);
    newSelectedItems.delete(code);

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
      selectedItems: newSelectedItems,
    });
  }

  /**
   * Выделение записи по коду
   * @param code {number} Код записи
   * @param isCtrlPressed {boolean} Нажата ли клавиша Ctrl
   */
  selectItem(code, isCtrlPressed) {
    const newSelectedItems = new Set(this.state.selectedItems);

    if (newSelectedItems.has(code)) {
      // Если элемент уже выделен, снимаем выделение
      newSelectedItems.delete(code);
    } else {
      // Если Ctrl не нажат, очищаем все выделения
      if (!isCtrlPressed) {
        newSelectedItems.clear();
      }
      newSelectedItems.add(code);

      // Увеличиваем счётчик только при добавлении выделения
      const newSelectionCounts = {
        ...this.state.selectionCounts,
        [code]: (this.state.selectionCounts[code] || 0) + 1,
      };

      this.setState({
        ...this.state,
        selectedItems: newSelectedItems,
        selectionCounts: newSelectionCounts,
      });
      return;
    }

    // Если снимаем выделение, просто обновляем selectedItems
    this.setState({
      ...this.state,
      selectedItems: newSelectedItems,
    });
  }
}

export default Store;
