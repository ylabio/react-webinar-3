/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map(item => ({...item, selectedCount: 0})) // добавляем свойство selectedCount в каждый объект списка
    };
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = [1, 2, 3, 4, 5, 6, 7]; // в этот массив записываем коды уже существующих элементов
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
   * Генерация уникального кода для новой записи
   * @returns {number}
   */
  generateCode() {
    // создаем переменную на основе длинны массива с нашими кодами + 1
    let newCode = this.usedCodes.length + 1;
    // проверим - нет ли нашего числа в массиве
    while (this.usedCodes.includes(newCode)) {
      // если есть - увеличиваем число, пока оно не будет уникальным
      newCode++;
    }
    // добавляем сгенерированное число в массив используемых чисел
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
  }

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
          // выполним проверку на существование свойства selected
          if (!item.hasOwnProperty('selected')) {
            // установим в true, если его не было
            item.selected = true;
          } else {
            // если было - обратное значение
            item.selected = !item.selected;
          }

          // увеличивыем счетчик выделений
          if (item.selected) {
            item.selectedCount++;
          }
        // дз выполнил Михаил Головешкин (tearsoprah), кто скопировал - нехороший человек
        } else {
          // всем остальным снимаем выделение
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
