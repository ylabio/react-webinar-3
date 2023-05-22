import { generateCode } from "./utils";

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
   * Добавление товара в корзину
   * @param code
   */
  addProduct(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: true,
            count: item.selected ? item.count + 1 : 1,
          };
        }
        // Сброс выделения если выделена
        return {
          ...item,
          count: item.count ? item.count : 0,
        };
      })
    })
  }

  /**
 * Удаление записи по коду
 * @param code
 */
  deleteProduct(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: false,
            count: 0,
          };
        }
        // Сброс выделения если выделена
        return item;
      })
    })
  };

  /**
   * Открытие модального окна
   */
  openModal() {
    this.setState({
      ...this.state,
      isModalOpen: true
    })
  };

  closeModal() {
    this.setState({
      ...this.state,
      isModalOpen: false
    })
  };
}

export default Store;
