import { generatorCode } from "./utils";

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
      list: [...this.state.list, {code: generatorCode(), title: 'Новая запись'}],
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, e) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)

    })
    e.stopPropagation();
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
          const isSelected = !item.selected;
          item.selected = isSelected;
          item.isSelected = isSelected;
          if (isSelected) {
            item.count = item.count ? ++item.count : 1;
          }
        } else {
          delete item.selected;
        }
        return item;
      })
    })
  }
}

export default Store;
