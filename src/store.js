/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.entryCode = initState.list.length ?? 0; // Счетчик кодов для записей
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
      list: [...this.state.list, { code: ++this.entryCode, title: 'Новая запись' }],
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
   * @param ctrlKey нажат ли Ctrl (или Cmd на macOS)
   */
  selectItem(code, ctrlKey) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        item.selectedCounter ??= 0; // Устанавливаем счетчик количества выделений каждой записи, если он еще не установлен

        if (ctrlKey) {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              item.selectedCounter++; // При выделении записи увеличиваем счетчик на 1
            }
          }
        } else {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              item.selectedCounter++; // При выделении записи увеличиваем счетчик на 1
            }
          } else {
            item.selected = false;
          }
        }

        return item;
      }),
    });
  }
}

export default Store;
