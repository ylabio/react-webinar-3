/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Обработчик нажатия клавиши
   * @param event {KeyboardEvent}
   */
  handleKeyDown(event) {
    if ((event.key === 'Control' || event.key === 'Meta') && !this.state.isCtrlPressed) {
      this.setState({
        ...this.state,
        isCtrlPressed: true,
      });
    }
  }

  /**
   * Обработчик отпускания клавиши
   * @param event {KeyboardEvent}
   */
  handleKeyUp(event) {
    if ((event.key === 'Control' || event.key === 'Meta') && this.state.isCtrlPressed) {
      this.setState({
        ...this.state,
        isCtrlPressed: false,
      });
    }
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
      list: [...this.state.list, { code: this.state.uniqCode, title: 'Новая запись' }],
      uniqCode: this.state.uniqCode + 1,
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
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.selected) {
            item.clickCount = item.clickCount !== undefined ? item.clickCount + 1 : 1;
          }
          item.selected = !item.selected;
        } else if (!this.state.isCtrlPressed) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}
// this.state.isCtrlPressed
export default Store;
