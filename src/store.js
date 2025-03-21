/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode = (initState.list && initState.list.length > 0) 
    ? Math.max(...initState.list.map(item => item.code))
    : 0;
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
    this.maxCode += 1
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.maxCode, title: 'Новая запись' }],
    });
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
  selectItem(code) {
   
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
         // document.addEventListener('keydown', event);
         // console.log(`Нажата клавиша: ${event.ctrlKey}`) 
         console.log(event.ctrlKey)
         if (event.ctrlKey){
            if (item.code === code) {
               item.selected = !item.selected;
               if (item.selected){
                 (item.count > 0) ? item.count++ : item.count=1;
               }
              } 
              return item;  
         }else{
         if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected){
              (item.count > 0) ? item.count++ : item.count=1;
            }
           } 
           else {item.selected = false;}}
           console.log(item)
          return item;
      }),
    });
  }
  
}



export default Store;
