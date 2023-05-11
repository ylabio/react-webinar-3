/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.codeNumber = this.state.list.length; //Уникальный номер добавляемых элементов (Задача 2)
    this.state.list = this.state.list.map((element) => ({
      ...element,
      selected: false, //Добавил дефолтную инициализацию переменной выбора элемента
      tapCounter: 0,
    })); // Добавляем каждому элементу списка переменную для рассчета количества выделений (Задача 3)
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
    this.codeNumber += 1; //Изменение уникального номера элемента перед добавлением в список (Задача 2)
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.codeNumber,
          title: "Новая запись",
          tapCounter: 0, //Добавляем счетчик выделения элемента (Задача 3)
          selected: false, //Добавил дефолтную инициализацию переменной выбора элемента
        }, 
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
          if (!item.selected) {
            //Добавление счетчика выделений только для невыделенного элемента (Задача 3)
            item.tapCounter += 1;
          }
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
