import {generator} from "./utils";
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.uniqueCodes = new Set(this.state.list.map(item => item.code));
    this.generateCode = generator(this.uniqueCodes);
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
    const newCode = this.generateCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selected: false, selectCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.uniqueCodes.delete(code);
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param isMultiple
   */
  selectItem(code, isMultiple = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelected = !item.selected;
          const selectCount = newSelected ? (item.selectCount || 0) + 1 : item.selectCount;
          return { ...item, selected: newSelected, selectCount };
        } else {
          return !isMultiple ? { ...item, selected: false } : item;
        }
      }),
    });
  }
}

export default Store;
