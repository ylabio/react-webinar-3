import {generateCode} from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.chosenItems = {};
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
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
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

    /**
   * Установка выбранных товаров
   * @param newState {Object}
   */
    setChosen(newState) {
      this.chosenItems = newState;
      // Вызываем всех слушателей
      for (const listener of this.listeners) listener();
    }

    /**
   * Добавление в корзину по коду
   * @param code {Number}
   */
    chooseItem(code) {
      const targetObj = this.state.list.find(item => item.code === code);
      if(!targetObj) return;
      let newItem = {};
      if (this.chosenItems.hasOwnProperty(code)) {
        newItem[code] = {
          ...targetObj, 
          count: this.chosenItems[code].count + 1
        }
      } else {
        newItem[code] = {...targetObj, count: 1};
      }
      this.setChosen({
        ...this.chosenItems,
        ...newItem
      })
    };

        /**
   * Удаление товара из корзины по коду
   * @param code {Number}
   */
    removeChosenItem(code) {
      if (this.chosenItems.hasOwnProperty(code)) {
        delete this.chosenItems[code];
        for (const listener of this.listeners) listener();
      } 
    };

    /**
   * Выбор выбранных товаров
   * @returns {Object}
   */
  getChosen() {
    return {
      chosenItems: this.chosenItems,
      count: Object.keys(this.chosenItems).length,
      price: Object.values(this.chosenItems).reduce((accumulator, item) => accumulator + item.count * item.price, 0)
    };
  }
}

export default Store;
