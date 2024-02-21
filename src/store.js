/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.ids = []; // Массив для хранения всех id

    this.state.list.map((item) => {
      // Добавляем в массив ids, коды начального массива, чтоб исключить повторение
      this.ids.push(item.code);
      // Добаляем каждому элементу счетчик для подсчета выделения элемента
      item.counter = 0;
    });
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
   * Генерация уникального id
   */
  genUniqueId() {
    // Создаем переменную id, которая равна длинне массива в котором хранятся все id + 1
    const id = this.ids.length + 1;
    // После создания id добавляем ее в массив, где хранятся все id
    this.ids = [...this.ids, id];
    return id;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { 
          code: this.genUniqueId(), 
          title: 'Новая запись',
          counter: 0,
        }
      ]
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

          if (item.selected) {
            item.counter++;
          }
        } else {
          item.selected = false;
        }
        
        return item;
      })
    })
  }
}

export default Store;
