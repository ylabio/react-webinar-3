/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = { list: [], usedCodes: new Set(), maxCode: 0 }) {
    this.state = initState;
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
   * Генерация уникального кода для новой записи
   * @returns {number} Уникальный код
   */
  generateUniqueCode() {
    let maxCode = this.state.usedCodes.size;
    let newCode = maxCode + 1;
    // Находим первый неиспользованный код, начиная с maxCode + 1
    while (this.state.usedCodes.has(newCode)) {
      newCode++;
    }
    // Обновляем maxCode, если это необходимо
    maxCode = Math.max(maxCode, newCode);
    return newCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const updateList = this.state.list;
    if (!this.state.usedCodes) {
      this.state.usedCodes = new Set(updateList); // Инициализируем, если еще не инициализировано
    }
    const newCode = this.generateUniqueCode();
    const newItem = {
      code: newCode,
      title: 'Новая запись',
      selected: false,
      selectedCount: 0,
    };

    // Добавляем код в множество использованных кодов
    this.state.usedCodes.add(newCode);

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const updateList = this.state.list;
    if (!this.state.usedCodes) {
      this.state.usedCodes = new Set(updateList); // Инициализируем, если еще не инициализировано
    }

    const updatedList = this.state.list.filter(item => item.code !== code);
    // Обновляем maxCode, если необходимо
    const maxCode = updatedList.length > 0 ? Math.max(...updatedList.map(item => item.code)) : 0;

    this.setState({
      ...this.state,
      list: updatedList,
      maxCode: maxCode,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, ctrlKey) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelectedCount = item.selected ? item.selectedCount : (item.selectedCount || 0) + 1; // Увеличиваем счетчик выделений
          return { ...item, selected: !item.selected, selectedCount: newSelectedCount }; // Переключаем выделение
        } else if (!ctrlKey) {
          // Если Ctrl не удерживается, сбрасываем выделение у остальных
          return { ...item, selected: false };
        }
        return item; // Возвращаем элемент без изменений, если Ctrl удерживается
      }),
    });
  }
}

export default Store;
