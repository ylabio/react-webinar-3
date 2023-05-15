/**
 * Хранилище состояния приложения
 */

import { v4 as uuidv4 } from 'uuid';

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.list = this.state.list.map(item => {
      return {...item, selectionCounter: 0};
    });
    this.state.uniqueCode = this.state.list.length;
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
      uniqueCode: this.state.uniqueCode += 1,
      list: [...this.state.list, {code: this.state.uniqueCode, title: 'Новая запись'}],
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
          !item.clicks? item.clicks = 0 : '';
          item.selected = !item.selected;
          item.selected? item.clicks++ : ''; 
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
} 

export default Store;