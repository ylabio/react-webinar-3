 // Импортируем нашу функцию
import GenerateUniqueId from "./helpers/generateUniqueld";


/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
    //В экшене будем формировать массив из всех айди 
    const currentIdsArray = this.state.list.map((item) => item.code);
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: GenerateUniqueId(currentIdsArray), title: 'Новая запись'}] // И на добавление нового элемента будем вставлять эту функцию в поле кода
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
        // Если item на который мы нажали не выбран
        // Он создаёт в нем поле selectedCount
        // Если его нет - записывает туда один
        // Если есть - прибавляет 1 к текущему значению
        // Теперь во всех нажатых элементах у нас будет поле, где будет цифра с кликами по нему
          if (!item.selected) {                                                    
            item.selectedCount = item.selectedCount ? item.selectedCount + 1 : 1;  
          }                                                                              
          item.selected = !item.selected;
        } else {                 
          item.selected = false;  
        }                        

        return item;
      })
    })
  }
}

export default Store;
