import {getGreaterRecordCode, generateNewUniqueCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // Добавить счётчик выделений элемента с нулём по умолчанию 
    this.state.list.forEach((item) => item.selectCount = 0)
    
    // Получить самое большое значения кода в начальных записях
    // Впоследствии он будет использоваться для генерации кодов новых записей
    this.initalCode = getGreaterRecordCode(this.state.list);
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
    // Генерируем код для новой записи
    const newCode = generateNewUniqueCode(this.initalCode)

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newCode, title: 'Новая запись', selectCount: 0},]
    })

    // Сохраняем код новой записи
    this.initalCode = newCode;
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

}

export default Store;
