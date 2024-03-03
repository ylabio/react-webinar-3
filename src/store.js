import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.shoppingList = []
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
  addItem(code) {
    const newItem = this.state.list.find(item => item.code === code);
    const idx = this.state.shoppingList.findIndex(item => item.code === code);
    if (idx !== -1) {
      // Если товар уже присутствует в списке покупок, создаем копию массива
      const updatedShoppingList = [...this.state.shoppingList];
      // Обновляем количество товара в копии массива
      updatedShoppingList[idx] = {
        ...updatedShoppingList[idx],
        quantity: updatedShoppingList[idx].quantity + 1
      };
      // Обновляем состояние
      this.setState({
        ...this.state,
        shoppingList: [...updatedShoppingList],
      });
    } else {
      // Если товара еще нет в списке покупок, добавляем его с начальным количеством 1
      newItem.quantity = 1;
      this.setState({
        ...this.state,
        shoppingList: [...this.state.shoppingList, newItem]
      });
    }
  };


  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const idx = this.state.shoppingList.findIndex(item => item.code === code);
    if (idx !== -1) {
      // Если товар найден в списке покупок
      const updatedShoppingList = [...this.state.shoppingList];
      // Если количество товара больше 1, уменьшаем его на 1
      if (updatedShoppingList[idx].quantity > 1) {
        updatedShoppingList[idx] = {
          ...updatedShoppingList[idx],
          quantity: updatedShoppingList[idx].quantity - 1
        };
      } else {
        // Если количество товара равно 1, удаляем его из списка
        updatedShoppingList.splice(idx, 1);
      }
      // Обновляем состояние
      this.setState({
        ...this.state,
        shoppingList: updatedShoppingList,
      });
    }
  };
}

export default Store;