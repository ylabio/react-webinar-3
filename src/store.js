/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map(item => ({...item, selectedCount: 0, selected: false})), // Добавляем свойство selectedCount и selected в каждый объект списка
      totalCounter: 7 // Количество элементов при инициализации списка (необходимо для получение нового кода элемента)
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
    }
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
    const { totalCounter, list } = this.state;
    const newItem = {
      code: totalCounter + 1,
      title: 'Новая запись',
      selectedCount: 0
    };

    this.setState({
      ...this.state,
      totalCounter: totalCounter + 1,
      list: [...list, newItem]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const {list} = this.state;
    const updatingList = list.map(item => {
      if (item.code === code) {
        return {
          ...item,
          selected: !item.selected,
          selectedCount: item.selected ? item.selectedCount : item.selectedCount + 1
        }
      } else {
        return {...item, selected: false}
      }
    });

    this.setState({
      ...this.state,
      list: updatingList
    });
  }
}

export default Store;
