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
      list: [...this.state.list, {
        code: this.state.list.length > 0 ? this.state.list.pop().code + 1 : 1
        , title: 'Новая строка', count: 0
      }]
    })
  };

  /**
  };
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
  makeEnding(number, prefix, one, two, many) {
    let snumber = number.toString()
    let digit = parseInt(snumber[snumber.length - 1], 10);
    if (isNaN(digit)) { return "" }

    if (snumber.length > 1 && snumber[snumber.length - 2] == '1') { return number + " " + prefix + many; }
    if (digit == 1) { return number + " " + prefix + one; }
    else if (digit > 1 && digit <= 4) { return number + " " + prefix + two; }
    else if (digit == 0 || digit >= 5) { return number + " " + prefix + many; }
    else { return "" }
  }


  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected !== true) {
            if (item.count >= 1) {
              item.count++
              const end = this.makeEnding(item.count, "раз", "", "а", "");

              const split = item.title.split('|')
              item.title = split[0] + `| Выделяли ${end}`
            } else {
              item.count++
              item.title = item.title + ` | Выделяли ${item.count} раз`
            }
          }
          item.selected = !item.selected;
        }
        if (item.code !== code) {
          item.selected = false;
        }
        return item;
      })
    })
  }

}



export default Store;
