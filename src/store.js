/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.code = this.state.list.slice(-1)[0].code + 1 // Играет роль ID. Сломается, если list изначально пустой
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
      list: [...this.state.list, { code: this.code++, title: 'Новая запись' }],
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
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        // selectItem находится в родительском классе кнопки удаления, поэтому перед удалением элемент выделяется, сбивая веделение остальных элементов
        if (event.target.tagName == 'BUTTON') {
            return item
        }
        if (item.code === code) {
          item.selected = !item.selected;
          this.selectCount(item)
        }
        else if (item.selected && !event.ctrlKey) {
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }

  selectCount(item) {
    // добавляет счетчик нажатий, если его нет, и увеличивает его на 1, если есть
    if (item.selected) {
      if (item.selectCount) {
          item.selectCount += 1
      } else {
          item.selectCount = 1
      }
    }
  }
}

export default Store;
