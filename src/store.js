
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
  addItem(code) {
    const item = this.state.list.find(item => item.code === code);
    let existingOrder = this.state.orders.find(order => order.code === item.code);

  if (existingOrder) {
    //Если товар уже есть в корзине, увеличиваем его количество
    existingOrder.count = existingOrder.count + 1;
    existingOrder.price = existingOrder.price + item.price;

    this.setState({
      ...this.state,
      orders:
        this.state.orders.map(order => 
        order.code === existingOrder.code ? {...order, count: existingOrder.count} : order),
      totalPrice: this.totalPriceCalculation(),      
    })} else {
    // Если товара еще нет в корзине, добавляем его
    this.setState({
      ...this.state,
      orders: [...this.state.orders, {...item, count: 1,}],
    });

    this.setState({
      ...this.state,
      countOrders: this.state.orders.length,
    })

    this.setState({
      ...this.state,
      totalPrice: this.totalPriceCalculation(),
    })
  }
  };

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      orders: this.state.orders.filter(order => order.code !== code),
    })

    this.setState({
      ...this.state,
      countOrders: this.state.orders.length,
    })

    this.setState({
      ...this.state,
      totalPrice: this.totalPriceCalculation(),
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
   * Расчет общей суммы заказов
   */
  totalPriceCalculation() {
    let commonPrice = this.state.orders.reduce((sum, order) => sum + order.price, 0);
    if (commonPrice>=0 &&
       this.state.countOrders > 0){
    return `${commonPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽` } 
    else {return 'пусто'}
  }
}

export default Store;
