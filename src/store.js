/**
 * Хранилище состояния приложения
 */
class Store {
    static number = 0;

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
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: this.getNumber(), title: 'Новая запись', countClick: 0}]
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
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.selected = !item.selected;
                } else {
                    item.selected = false
                }
                if (item.selected) {
                    item.countClick++
                }
                return item;
            })
        })
    }

    getNumber() {
        if (Store.number === 0) {
            Store.number = 8;// при удалении записи (перед первым добавлением новой позиции) номера задваиваются-> захардкодила
            // Store.number=this.state.list.length+1;
        } else {
            Store.number++;
        }
        return Store.number;
    }
}

export default Store;
