/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.codes = this.state.list.map(item => item.code); //массив кодов элементов списка
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
   * Генерируем новый уникальный код
   * @param arr
  */
  generateNewCode(arr) {
    let newCode;
    do {
      //newCode = Math.floor((Math.random() * Math.max(...this.codes)) + Math.max(...this.codes) + 1);      
      newCode = Math.max(...this.codes) + 1;      
    } while (arr.includes(newCode));
    return newCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let newCode = this.generateNewCode(this.codes);
    this.codes.push(newCode);

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newCode, title: 'Новая запись', counter: 0}]
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
          item.selected = !item.selected;
          if (item.selected === true) ++item.counter; // увеличиваем счетчик выделений
        }
        else {
          item.selected = false; // скрываем выделение у остальных элементов
        }
        return item;
      })
    })
  }
}

export default Store;
