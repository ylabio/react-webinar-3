import { generateCode } from './utils';

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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
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

  addCartItem(item) {
    // Получаем текущий secondList или пустой массив, если он undefined
    const currentList = this.state.cartList || [];

    // Проверяем, есть ли элемент с таким code в массиве
    const existingItemIndex = currentList.findIndex(i => i.code === item.code);

    if (existingItemIndex >= 0) {
      // Элемент уже есть - увеличиваем amount
      const updatedList = currentList.map((i, index) =>
        index === existingItemIndex ? { ...i, amount: (i.amount || 0) + 1 } : i,
      );

      this.setState({
        ...this.state,
        cartList: updatedList,
      });
    } else {
      // Новый элемент - добавляем с amount: 1
      this.setState({
        ...this.state,
        cartList: [...currentList, { ...item, amount: 1 }],
      });
    }
    this.updateCartValue();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(item => item.code !== code),
    });
    this.updateCartValue();
  }

  /**
   * Возвращает общую сумму (price * amount) всех элементов в secondList
   * @returns {number}
   */
  getTotalCash() {
    return this.state.cartList.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.amount || 1);
    }, 0);
  }

  /**
   * Возвращает общее количество элементов в secondList (сумма amount)
   * @returns {number}
   */
  getTotalAmount() {
    return this.state.cartList.length;
  }

  updateCartValue() {
    this.setState({
      ...this.state,
      cartValue:{amount:this.getTotalAmount(),cash:this.getTotalCash()},
    });
  }
}

export default Store;
