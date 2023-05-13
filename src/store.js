
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.count = 0; // Количество нажатий на кнопку "Добавить"
    this.uniqCode = 7; // Код новой записи
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
  addItem() {
    this.count++; // Увеличиваем счётчик
    this.uniqCode++; // Увеличиваем код, чтобы он был уникальным
    
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.uniqCode, countSelected: 0, title: 'Новая запись'}]
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
          
          // Отображение количества выделений элемента
          if(item.selected) {
            item.countSelected += 1;
          }
          
        } else {
          // Очищаем все выделения
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
