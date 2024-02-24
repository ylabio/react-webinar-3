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
   generateUniqueCode() {
    return Date.now() + Math.floor(Math.random() * 10);
  }
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.generateUniqueCode(), title: 'Новая запись',count:0}]
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
            item.count++;            
             if(item.count==12||item.count==13||item.count==14){
              item.title=`Выделяли ${item.count} раз`
            }
            else if(item.count % 10 ==2||item.count % 10 ==3||item.count % 10 ==4)
            {item.title=`Выделяли ${item.count} раза`}
            else{
              item.title=`Выделяли ${item.count} раз`
            }            
          }     
        }
        else {
          item.selected = false; 
          
        }
        return item;
      })
    })
  }
}

export default Store;
