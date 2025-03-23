/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    //задача 2.1
    this.lastCode = Math.max(0, ...initState.list.map(item => item.code)); // Находим максимальный код
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
    this.lastCode += 1; // Увеличиваем счётчик
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.lastCode, title: 'Новая запись', selected: false, selectionCount: 0 },
      ],
    });
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
   */

  selectItem(code, isCtrlPressed) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Если запись уже выделена и Ctrl не нажат, снимаем выделение
          if (item.selected && !isCtrlPressed) {
            item.selected = false;
          } else {
            // Если Ctrl нажат или запись не выделена, добавляем её к выделенным
            item.selected = true;
            // Увеличиваем счётчик выделений
            item.selectionCount = (item.selectionCount || 0) + 1;
          }
        } else if (!isCtrlPressed) {
          // Если Ctrl не нажат, снимаем выделение с других записей
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
