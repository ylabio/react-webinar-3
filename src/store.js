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
          code: this.uniqueСode(this.state.list),
          title: "Новая запись",
          count: 0,
        },
      ],
    });
  }

  /**
   * Присвоение нвого кода (задание2)
   * @param list
   */

  uniqueСode(list) {
    let newCode = [];
    list.forEach((el) => {
      newCode.push(el.code);
    });
    return Math.max(...newCode) + 1;
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
          item.selected ? item.count++ : item.count; // задание 3
        } else item.selected = 0; //задание 1
        return item;
      }),
    });
  }

  /**
   * Вывести количество совершенных выделений / task 3
   * @param count
   */

  countContent(count) {
    let strCount = count.toString();
    let lastNum = +strCount[strCount.length - 1];
    let result = "";
    if (count > 10 && count < 20) {
      result = ` | Выделяли ${count} раз`;
      return result;
    } else if (
      strCount.length > 2 &&
      Number(strCount.slice(-2)) > 10 &&
      Number(strCount.slice(-2)) < 20
    ) {
      result = ` | Выделяли ${count} раз`;
      return result;
    } else if (lastNum >= 2 && lastNum < 5) {
      result = ` | Выделяли ${count} раза`;
    } else if (lastNum === 1 || lastNum >= 5) {
      result = ` | Выделяли ${count} раз`;
    } else if (lastNum === 0 && strCount.length > 1) {
      result = ` | Выделяли ${count} раз`;
    } else result = "";

    return result;
  }
}

export default Store;
