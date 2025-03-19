/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = new Set();
    initState.list.forEach(item => this.usedCodes.add(item.code)); //Заполняем множество использующимися кодами записей
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
   * Генерация уникального кода
   * */
  generateUniqueCode() {
    let code = 1;

    if (this.usedCodes.size > 0) {
      code = Math.max(...this.usedCodes) + 1;
    }

    return code;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectedTimes: 0 }],
    });
    this.usedCodes.add(newCode);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(e, code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.selected) {
            //По хорошему конечно делать иммутабельные изменения объекта, используя новую копию, но в контексте данной задачи с учетом мутабельного изменения item.selected решил реализовать таким образом
            item.selectedTimes++
          }

          item.selected = !item.selected;
        }

        else if (!e.ctrlKey) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
