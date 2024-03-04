/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.numb = this.state.list.length;
    this.selected = {};
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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
    this.numb += 1;
    var title = "Новая запись";
    if (this.selected[this.numb]) {
      title += ` | Выделено ${this.selected[this.numb]} раз`
    }
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.numb, title: title }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(event, code) {
    event.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          if (!item.selected) {
            if (this.selected[item.code]) {
              this.selected[item.code] += 1;
            }
            else {
            this.selected[item.code] = 1;
            item.title += ' |';
          }
            item.title = item.title.substring(0, item.title.lastIndexOf(" |")) + ` | Выделяли ${this.selected[code]} раз`
            if ([2,3,4].indexOf(this.selected[item.code] % 100 % 10) > -1 && Math.floor(this.selected[item.code] % 100 / 10) != 1) item.title+='а';
          }
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
