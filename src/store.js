/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map(item => ({...item, selectedCount: 0})) //  selectedCount добавим в каждый объект списка
    };
    this.listeners = []; //Слушатели изменений состояний
    this.usedCodes = [1, 2, 3, 4, 5, 6, 7]; // коды уже существующих элементов записывыаются в этот массив
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

  generateCode() {
    //На основе длинны массива создаем переменную c нашими кодами + 1
    let newCode = this.usedCodes.length + 1;
    // Имеется ли наше число в массиве
    while (this.usedCodes.includes(newCode)) {
      // если да - увеличиваем число, пока оно не станет уникальным
      newCode++;
    }
    // добавляем его в массив используемых чисел
    this.usedCodes.push(newCode);
    return newCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.generateCode(), title: 'Новая запись', selectedCount: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
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
          !item.selected && item.selectedCount++;
          item.selected = !item.selected;
            } else {
                item.selected = false;
            }
            return item;
        }),
    });
  }
}

export default Store;
