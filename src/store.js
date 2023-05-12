/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.addItem = this.addItem.bind(this);
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
    const { list } = this.state;
    let maxCode = 0;
    if (list.length > 0) maxCode = Math.max(...list.map((item) => item.code)); // находим максимальный код
    this.setState({
      ...this.state,
      list: [...list, { code: maxCode + 1, title: 'Я новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const { list } = this.state;

    // Ищем выделенную ранее запись, если она есть
    const prevSelected = list.find((item) => item.selected);

    const newList = list.map((item) => {
      if (item.code === code) {
        // Находим количество выделений для этой записи и инкрементируем его
        const count = item.count ? item.count + 1 : 1;
        // Обновляем запись, добавляя количество выделений
        return { ...item, selected: true, count: count };
      } else if (prevSelected && prevSelected.code === item.code) {
        // Если нажали на выделенную запись, то снимаем с нее выделение и пересчитываем количество выделений
        const count = item.count ;
        return { ...item, selected: false, count: count };
      } else {
        // Если нажали на другую запись, то оставляем все без изменений
        return item;
      }
    });

    this.setState({ ...this.state, list: newList });
  }
}

export default Store;
