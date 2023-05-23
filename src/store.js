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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись" },
      ],
    });
  }

  addCartItem(code) {
    const cartList = [...this.state.cartList];
		let isNew;
		let item;
    const itemIdx = cartList.findIndex((el) => el.code == code);
    if (itemIdx !== -1) {
			item = cartList[itemIdx]
			cartList[itemIdx] = {...item, count: item.count + 1}
    } else {
      item = this.state.list.find((el) => el.code == code);
      cartList.push({ ...item, count: 1 });
			isNew = true;
    }
    this.setState({
      ...this.state,
      cartTotalCount: isNew
        ? this.state.cartTotalCount + 1
        : this.state.cartTotalCount,
      cartTotalPrice: this.state.cartTotalPrice + item.price,
      cartList,
    });
  }

  deleteCartItem(code) {
		const delItemIdx = this.state.cartList.findIndex((el) => el.code == code);
		const delItem = this.state.cartList[delItemIdx]
		const cartList = [...this.state.cartList.slice(0, delItemIdx), ...this.state.cartList.slice(delItemIdx + 1)]
		const cartTotalPrice =
      this.state.cartTotalPrice - delItem.count * delItem.price;
		const cartTotalCount = this.state.cartTotalCount - 1;
		
    this.setState({
      ...this.state,
      cartList,
      cartTotalPrice,
      cartTotalCount,
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
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
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
