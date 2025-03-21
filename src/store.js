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
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.state.sequence + 1,
          title: 'Новая запись',
          selectCount: 0,
        },
      ],
      sequence: this.state.sequence + 1,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
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
   * @param code
   */
  selectItem(code, e) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          item.selectCount = item.selected ? item.selectCount + 1 : item.selectCount;
        } else {
          if (e.ctrlKey) {
            return item;
          }
          item.selected = false;
        }
        return item;
      }),
    });
  }

  getCountLine(item) {
    let count = item.selectCount;
    if (count === 0) {
      return '';
    }
    let nums = new Set(['2', '3', '4']);
    if (nums.has(count.toString()[count.toString().length - 1])) {
      if (count.toString()[count.toString().length - 2] !== '1') {
        return `| Выделяли ${count} раза`;
      }
    }
    return `| Выделяли ${count} раз`;
  }
}

export default Store;
