/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
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
   * Добавление новой записи
   */
  addItem() {
    this.setState(prevState => {
      const list = prevState.list || [];

      const maxCode = list.reduce((max, item) => Math.max(max, item.code), 0);
      const newCode = maxCode + 1;

      return {
        list: [...list, { code: newCode, title: 'Новая запись', selected: false }],
      };
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */

  deleteItem(code) {
    this.setState(prevState => {
      const list = Array.isArray(prevState.list) ? prevState.list : [];
      const updatedList = list.filter(item => item.code !== code);

      return { list: updatedList };
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event = {}) {
    this.setState(prevState => {
      const list = prevState.list || [];

      return {
        list: list.map(item => {
          if (event.ctrlKey || event.metaKey) {
            return item.code === code
              ? { ...item, selected: !item.selected, selectCount: (item.selectCount || 0) + 1 }
              : item;
          } else {
            if (item.code === code && item.selected) {
              return { ...item, selected: false };
            }
            return {
              ...item,
              selected: item.code === code,
              selectCount: item.code === code ? (item.selectCount || 0) + 1 : item.selectCount,
            };
          }
        }),
      };
    });
  }
}

export default Store;
