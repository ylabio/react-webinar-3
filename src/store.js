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
    this.listeners.forEach(listener => listener());
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const idCode =
      this.state.list.length > 0 ? Math.max(...this.state.list.map(item => item.code)) : 0;
    //создается уникальный код.
    const newItem = {
      code: idCode + 1,
      title: 'Новая запись',
      selected: false,
      count: 0,
    };

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
          const isSelected = !item.selected;

          // возвращение нового объект
          return {
            ...item,
            selected: isSelected,
            count: isSelected ? (item.count || 0) + 1 : item.count,
          };
        }

        // если элемент не выбран, то обновляем его в зависимости от ctrl/metaKey
        return e.ctrlKey || e.metaKey ? item : { ...item, selected: false };
      }),
    });
  }
}

export default Store;
