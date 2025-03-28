import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}, initBasketState = { list: [] }, startOpenPopupFlag = false) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.basketState = initBasketState;
    this.openPopupFlag = startOpenPopupFlag;
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
   * Выбор состояния попапа
   * @returns {Object}
   */
  getOpenPopupFlag() {
    return this.openPopupFlag;
  }

  /**
   * Выбор состояния корзины
   * @returns {Object}
   */
  getBasketState() {
    return this.basketState;
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
   * Установка состояния корзины
   * @param newBasketState {Object}
   */
  setBasketState(newBasketState) {
    this.basketState = newBasketState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Переключение модалки
   */
  togglePopupFlag() {
    this.openPopupFlag = !this.openPopupFlag;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Добавление товара в корзину
   */
  addBasketItem(code) {
    const itemToAdd = this.state.list.find(item => item.code === code);
    if (itemToAdd) {
      this.setBasketState({
        ...this.basketState,
        list: [
          ...(this.basketState.list || []),
          { ...itemToAdd }
        ],
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

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
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
