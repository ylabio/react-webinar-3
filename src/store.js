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
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: Math.floor((Date.now() / 100000000) * Math.random()),
          title: "Новая запись",
          selectCount: 0,
        },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  getLastLetter = (number) => {
    let strValue = number.toString();
    let lastTwoNum = Number(strValue.slice(-2));

    if (lastTwoNum >= 12 && lastTwoNum <= 14) {
      return "";
    } else {
      if (lastTwoNum % 10 >= 2 && lastTwoNum % 10 <= 4) {
        return "а";
      } else {
        return "";
      }
    }
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectCount++;
          }
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
