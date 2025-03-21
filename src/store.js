/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.counter = 0;

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
    const uniqueCode = (Date.now() % 100000) + this.counter++;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {code: uniqueCode, title: 'Новая запись', selected: false},
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code {Number} - уникальный код записи
   */
  deleteItem(code) {
    const currentList = this.state.list;
    const updatedList = currentList.filter(item => item.code !== code);
    console.log(updatedList)
    const newList = updatedList.map(item => ({
      ...item,
      selected: item.selected,
    }));
    this.selectItem(code, false);

    this.setState({
      ...this.state,
      list: newList,
    });
  }

  /**
   * Выделение записи по коду
   * @param code {Number} - уникальныйц код записи
   * @param ctrlKey {Boolean} - состояние нажатой клавиши ctrl/cmd
   */
  selectItem(code, ctrlKey) {
    let itemList = this.state.list.map(item => {
      if (item.code === code) {
        if (item.selected) {
          if (ctrlKey) {
            item.selected = false;
          } else {
            item.selected = false;
          }
        } else {
          item.selected = true;
          if (!item.selectionCount) {
            item.selectionCount = 1;
          } else {
            item.selectionCount++;
          }
        }
      }
      if (!ctrlKey && item.code !== code) {
        item.selected = false;
      }
      return item;
    });

    this.setState({
      ...this.state,
      list: itemList,
    });
  }
}
export default Store;
