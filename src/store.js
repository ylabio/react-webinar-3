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
    const lastItem = this.state.list[this.state.list.length - 1];
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: lastItem ? lastItem.code + 1 : 1, title: 'Новая запись' }],
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
   * Сборка текста о количестве выделения задач
   */
  getCountText(item) {
    if (item.selected) {
      item.selectedCountText = ' | Выделяли ';
      item.selectedCount ? (item.selectedCount += 1) : (item.selectedCount = 1);
      switch (item.selectedCount % 10) {
        case 2:
        case 3:
        case 4:
          if (
            item.selectedCount % 100 !== 12 &&
            item.selectedCount % 100 !== 13 &&
            item.selectedCount % 100 !== 14
          ) {
            item.selectedCountText += item.selectedCount + ' раза';
            break;
          }
        default:
          item.selectedCountText += item.selectedCount + ' раз';
      }
    }
    return item;
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    if (event.target.tagName === 'BUTTON') {
      return;
    }

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (
            item.selected &&
            this.state.list.filter(item => item.selected).length > 1 &&
            !isCtrlPressed
          ) {
            item.selected = item.selected;
          } else {
            item.selected = !item.selected;
            this.getCountText(item);
          }
        } else if (!isCtrlPressed) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
