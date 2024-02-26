/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.deletedCodes = []; // Массив удаленных кодов
    this.selectionCounts = {}; // Счетчик выделенных элементов
    this.selectedItems = new Set(); // Множество выделенных элементов
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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
   * Генератор уникального кода
   */
  generateNewCode() {
    const itemCount = this.state.list.length + this.deletedCodes.length;
    return itemCount + 1;
  }

  /**
   * Добавление новой записи с новым уникальным кодом
   */
  addItem() {
    let newCode = this.generateNewCode();

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: newCode,
          title: 'Новая запись',
        },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.deletedCodes.push(code);

    this.state.list = this.state.list.filter((item) => item.code !== code);

    if (this.selectedItems.has(code)) {
      this.selectedItems.delete(code);
    }

    this.setState({...this.state});
  }

  /**
   * Выделение записи по коду
   * @param code
   */

  selectItem(code) {
    const item = this.state.list.find((item) => item.code === code);
    if (!item) return;

    item.selected = !item.selected;

    if (item.selected) {
      for (const otherItem of this.state.list) {
        if (otherItem.code !== code && otherItem.selected) {
          otherItem.selected = false;
          this.selectedItems.delete(otherItem.code);
        }
      }
      this.selectedItems.add(code);
      this.selectionCounts[code] = (this.selectionCounts[code] || 0) + 1;
    } else {
      this.selectedItems.delete(code);
    }

    this.setState({...this.state});
  }

  /**
   * Получение количества выделений для заданной записи
   */
  getSelectionCount(code) {
    return this.selectionCounts[code] || 0;
  }

  getPluralizedForm(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return ` ${count} раз`;
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return ` ${count} раза`;
    } else {
      return ` ${count} раз`;
    }
  }
}

export default Store;
