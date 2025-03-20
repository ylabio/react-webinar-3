/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastId = initState.list[initState.list.length - 1].code;
    this.selectedItemsCount = 0;
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
   * Установка значения последнего id записи
   * @param lastId
   */
  setLastId(lastId) {
    this.lastId = lastId;
  }

 /**
   * Установка количества выделленых записей
   * @param selectedItemsCount
   */
  setSelectedItemsCount(selectedItemsCount) {
    this.selectedItemsCount = selectedItemsCount;
  }


  /**
   * Добавление новой записи
   * @param ev
   */
  addItem(ev) {
    ev.stopPropagation();
    const lastId = this.lastId + 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: lastId, title: 'Новая запись'}],
    });
    this.setLastId(lastId);
  }

  /**
   * Удаление записи по коду
   * @param code
   * @param ev
   */
  deleteItem(code, ev) {
    ev.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Определяем форму сообщения о количестве выделений записи
   * @param count
   * @param singular
   * @param few
   * @param many
   */
  pluralize(count, singular, few, many) {
    const number = Math.abs(count) % 100;
    const number1 = number % 10;

    if (number1 === 1 && number !== 11) {
      return `${count} ${singular}`;
    } else if (number1 >= 2 && number1 <= 4 && (number < 12 || number > 14)) {
      return `${count} ${few}`;
    } else {
      return `${count} ${many}`;
    }
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param event
   */
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = this.selectedItemsCount > 1 && (event.ctrlKey || event.metaKey) ? !item.selected : this.selectedItemsCount > 1 ? true : !item.selected;
          if (item.selected) {
            item.selectedCount = item.selectedCount ? item.selectedCount + 1 : 1;
            item.selectedMessage = item.selectedCount ? ` | Выделяли ${this.pluralize(item.selectedCount, 'раз', 'раза', 'раз')}` : '';
          }
        } else {
          if (!event.ctrlKey && !event.metaKey) {
            item.selected = false;
          }
        }

        return {...item};
      }),
    });

    this.setSelectedItemsCount(this.state.list.filter(item => item.selected).length);
  }
}

export default Store;
