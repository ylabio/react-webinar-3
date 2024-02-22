import { forwardRef } from "react";

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
    const generateCode = () => {
      let code = Math.floor(Math.random() * 100);
      while (this.state.list.some((item) => item.code === code)) {
        code = Math.floor(Math.random() * 100);
      }
      return code;
    };
    let generatedCode = generateCode();

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: generatedCode,
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
          item.selectCount = item.selectCount + 1;
          // item.title = `${item.title} | Выделяли ${item.selectCount} раз`;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
