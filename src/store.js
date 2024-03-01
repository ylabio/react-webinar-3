import {generateCode} from "./utils";

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
  openModal() {
        this.setState({
            ...this.state,
            isModalOpen: true
        });
    }
    closeModal() {
        this.setState({
            ...this.state,
            isModalOpen: false
        });
    }

  /**
   * Добавление новой записи
   */
  addItem(code) {
      const newList = this.state.list.map(item => {
          if (item.code === code) {
              return {
                  ...item,
                  count: item.hasOwnProperty('count') ? item.count + 1 : 1
              };
          }
          return item; 
      });

      this.setState({
          list: newList
      });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
    deleteItem(code) {
        const newList = this.state.list.map(item => {
            if (item.code === code) {
                const { count, ...newItem } = item;
                return newItem;
            }
            return item;
        });
        this.setState({
            ...this.state,
            list: newList
        });
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
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
