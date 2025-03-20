/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.countItem = 0; // Счетчик записей
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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.countItem += 1, title: 'Новая запись', allocCounter: 0 }],
    });
  }

  /**
   * Возвращает количество элементов списка
   */
  getListLength(){
    return this.state.list.length;
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
   * Единичное выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        
        if (item.code == code){
          
          if(!item.selected || item.selected === undefined){
            item.allocCounter += 1;
          }

          item.selected = !item.selected;

        }else{
          item.selected = false;
        }

        return item;
      }),
    });
  }

    /**
   * Множественное выделение записей по коду
   * @param code
   */
  multiSelectItem(code){
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {

          if(!item.selected || item.selected === undefined){
            item.allocCounter += 1;
          }

          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }

}

export default Store;
