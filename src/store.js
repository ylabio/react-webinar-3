/**
 * Хранилище состояния приложения
 */
import { randomNum } from "./utils";

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

  /**;
   * Добавление новой записи
   */
  addItem() {
    // Добавление записей с лимитом 20
    // Добавил лимит так, как рандомный уникальный код формируется в интервале, в данном случае от 0 до 20
    if (this.state.list.length < 20) {
      this.setState({
        ...this.state,
        list: [
          ...this.state.list,
          {
            // Опрделение рандомного уникального кода на основе списка list
            code: randomNum(this.state.list),
            title: "Новая запись",
            countSelected: 0,
          },
        ],
      });
    } else alert("Превышен лимит добавления записей");
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
        } else item.selected = false;
        return item;
      }),
    });
  }

  // Изменение счетчика выделений
  setCountSelected(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          ++item.countSelected;
          return item;
        } else return item;
      }),
    });
  }
}

export default Store;
