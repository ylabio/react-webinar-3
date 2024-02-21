/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // Добавить счётчик выделений элемента с нулём по умолчанию 
    this.state.list.forEach((item) => item.selectCount = 0)
    
    // Генерация уникального кода для новых записей
    // В последствии он будет увеличиваться на 1
    this.initalCode = this.generateInitialCode();
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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.generateNewUniqueCode(), title: 'Новая запись', selectCount: 0},]
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

          // Если элемент не выделен -> выделить и увеличить значение счётчика 
          if (!item.selected) {
            item.selected = true;
            item.selectCount++
          } 
          
          // Если элемент выделен -> обнули выделение
          else {
            item.selected = false;
          }
        } 
        
        // Если элемент не подходит по коду -> обнули выделение 
        else {
          item.selected = false;
        }

        return item;
      })
    })
  }

  // Проанализирует коды начальных значений и вернёт код с самым большим значением 
  // на основе него буду генерироваться новые коды для новых записей 
  generateInitialCode() {
    let initalCode = 0;

    this.state.list.map((item) => {
      if (item.code > initalCode) {
        initalCode = item.code;
      }
    })

    return initalCode;
  }
  
  // Генерирует новый уникальный код путём инкремента прошлого кода на 1
  generateNewUniqueCode() {
    return this.initalCode += 1;
  }
}

export default Store;
