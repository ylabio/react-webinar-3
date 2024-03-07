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


  
cartList(){
  let total = 0;
  const cartEls = [];
  for (const codeStr in cart) {
    
    const code = +codeStr;
    const item = items.find((x) => x.code === code);

    if (!item) {
      continue;
    }
    const cnt = cart[codeStr];
    cartEls.push(
      <CartItem key={code} item={item} cnt={cnt} onDelete={onDeleteItem} />
    );
    total += cnt * item.price;
  }
  }

  /**
   * Добавление новой записи
   */
  generateUniqueCode() {
    return Date.now() + Math.floor(Math.random() * 10);
  }
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись", price: 111 },
      ],
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
