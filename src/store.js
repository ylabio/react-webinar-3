import {pluralize} from './utils.js';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.count = initState.list.length; // Начальное значение счётчика записей
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
    this.count++; // Увеличение счётчика записей на единицу при добавлении новой записи
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.count, title: 'Новая запись', selectedCount: 0}]
    });
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
          if (item.selected) {
            item.selected = false;
            item.subtitle = '';
          }
          else {
            item.selected = true;
            item.selectedCount++;
            item.subtitle = ` | Выделяли ${item.selectedCount} ${pluralize(item.selectedCount)}`;
          }
        }
        else {
          item.selected = false;
          item.subtitle = '';
        }
        return item;
      })
    })
  }
}

export default Store;
