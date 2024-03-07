import {generateCode} from "./utils";
import item from "./components/item";

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
  addItem(itemId) {
    const existingItem = this.state.storeList.find(item => item.code === itemId);

    if (existingItem) {
      const updatedStoreList = this.state.storeList.map(item =>
        item.code === itemId ? {...item, count: item.count + 1} : item,
      );

      this.setState({
        ...this.state,
        storeList: updatedStoreList,
      });
    } else {
      const newItem = this.state.list.find(item => item.code === itemId);

      if (newItem) {
        this.setState({
          ...this.state,
          storeList: [...this.state.storeList, {...newItem, count: 1}],
        });
      }
    }
    console.log(this.state.storeList);
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      storeList: this.state.storeList.filter(item => item.code !== code),
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
      }),
    });
  }

  getCartPrice() {
    let sum = 0;
    for (const item of this.state.storeList) {
      sum += item.count * item.price;
    }

    return sum;
  }

  getCartCount() {
    let count = 0;
    for (const item of this.state.storeList) {
      count += item.count;
    }

    return count;
  }
}

export default Store;
