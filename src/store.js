<<<<<<< HEAD
=======
import {generateCode} from "./utils";

>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
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
<<<<<<< HEAD
      list: [...this.state.list, {code: this.state.list.length + 1, title: 'Новая запись'}]
=======
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
<<<<<<< HEAD
=======
      // Новый список, в котором не будет удаляемой записи
>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
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
<<<<<<< HEAD
          item.selected = !item.selected;
        }
        return item;
=======
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
>>>>>>> 6aee3f677bc8d67481675126f817a1d72e5b5cd2
      })
    })
  }
}

export default Store;
