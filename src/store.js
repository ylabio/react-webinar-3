import {createIdGenerator} from "./utils";

/**
 * Хранилище состояния приложения
 */
const MAX_ID_CODE = 50;

const randomId = createIdGenerator(MAX_ID_CODE);

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set();
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
    let newCode;
    do {
      newCode = Math.max(...this.state.list.map(item => item.code), randomId()) + 1;
    } while (this.usedCodes.has(newCode));
    this.usedCodes.add(newCode);

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newCode, title: 'Новая запись'}]
    })
  };

  /**
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
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }

        return item;
      })
    })
  }

  incrementCountClicks(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.count) {
            item.count = 0;
          }
          return {...item, count: item.count + 1};
        } else {
          return item;
        }
      })
    })
  }
}

export default Store;
