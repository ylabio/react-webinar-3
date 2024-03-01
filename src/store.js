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

  openModal(name) {
    this.setState({...this.state, modal: name});
  }

  closeModal() {
    this.setState({...this.state, modal: false});
  }


  addBasketItem(code) {
    let finder = false;

    const list = this.getState().basketItems.list.map(item => {
      if (item.code === code) {
        finder = true
        return {...item, counter: item.counter + 1}
      } else {
        return item
      }
    })

    if (!finder) {
      const item = this.getState().list.find(item => item.code === code);
      list.push({...item, counter: 1})
    }

    const sum = list.reduce((a, b) => a + (b.counter * b.price), 0);

    this.setState({
      ...this.state,
      basketItems: {
        ...this.state.basketItems,
        list,
        count: list.length,
        sum
      }
    })
  }

  removeItemBasket(code) {
    const list = this.getState().basketItems.list.filter(item => item.code !== code);
    const sum = list.reduce((a, b) => a + (b.counter * b.price), 0);

    this.setState({
      ...this.state,
      basketItems: {
        ...this.state.basketItems,
        list,
        count: list.length,
        sum
      }
    })
  }

}

export default Store;
