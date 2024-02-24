/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.recordId = initState.list ? initState.list.length : 0
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
   * Увеличение кода записи
   */
  upRecordId() {
    this.recordId = this.recordId + 1
  }
  
  /**
   * Добавление новой записи
   */
  addItem() {
    this.upRecordId()

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.recordId, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    console.log('before', {...this.state})

    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })

    console.log(this.state)
  };

  /**
   * Выделение записи по коду
   * Увеличение количества выделений
   * @param code
   */
  selectItem(currentCode) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const { selected, selectedCount, code } = item
        const count = selectedCount || 0

        if (code === currentCode) {
          item.selected = !selected;
          item.selectedCount = item.selected ? count + 1 : count
        } else {
          item.selected = false;
        }

        return item;
      })
    })
  }
}

export default Store;
