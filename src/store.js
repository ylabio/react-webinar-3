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

  // Добавление товара в корзину
  onBucketAdd(code) {
    const bucket = this.state.bucket;
    const duplicate = bucket.itemsList.find((item) => item.code === code);

    // Если товар этого типа уже в корзине, - увеличиваем его количество
    if (duplicate) {
      duplicate.amount = duplicate.amount + 1;
      this.setState({
        ...this.state,
        bucket: {
          ...bucket,
          totalPrice: bucket.totalPrice + duplicate.price,
        },
      });
    } else {
      const newItem = this.state.list.find((item) => item.code === code);

      this.setState({
        ...this.state,
        bucket: {
          itemsList: [...bucket.itemsList, { ...newItem, amount: 1 }],
          uniqueItems: bucket.uniqueItems + 1,
          totalPrice: bucket.totalPrice + newItem.price,
        },
      });
    }
  }

  // Удаление товара из корзины
  onBucketRemove(code) {
    const bucket = this.state.bucket;
    const itemToRemove = bucket.itemsList.find((item) => item.code === code);
    const newBucketList = bucket.itemsList.filter(
      (item) => !(item.code === code)
    );

    this.setState({
      ...this.state,
      bucket: {
        itemsList: newBucketList,
        uniqueItems: bucket.uniqueItems - 1,
        totalPrice:
          bucket.totalPrice - itemToRemove.price * itemToRemove.amount,
      },
    });
  }
}

export default Store;
