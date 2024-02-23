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
    this.setState({
      list: [
        ...this.state.list,
        { code: this.examination(Date.now()), title: "Новая запись" },
      ],
    });
  }
  examination(code) {
    if (this.state.list.some((elem) => elem.code === code)) {
      return this.examination(Math.floor(Math.random() * Date.now()));
    } else {
      return code;
    }
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  pluralize(number) {
    let str = {
      1: "раз",
      2: "раза",
    };

    if (number > 20) {
      number = number % 10;
    }

    if (number > 1 && number < 5) {
      return str[2];
    } else {
      return str[1];
    }
  }
  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      list: this.state.list.map((item) => {
        let count = 0;

        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            if (item.count > 0) {
              count = item.count + 1;
            } else if (item.count === 0 || item.count == undefined) {
              count++;
            }
          } else {
            if (item.count != undefined) {
              count = item.count;
            }
          }
        } else {
          if (item.count != undefined) {
            count = item.count;
          }
          item.selected = false;
        }

        return {
          code: item.code,
          title: item.title,
          selected: item.selected,
          count: count,
        };
      }),
    });
  }
}

export default Store;
