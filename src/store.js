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
            item.title = item.title.replace(/\| Выделяли \d+ раз\D*/, '');  

            item.count++;  

            let lastTwoDigits = item.count % 100;
            let lastDigit = item.count % 10; 

            if(lastTwoDigits===12||lastTwoDigits===13||lastTwoDigits===14){
              item.title=`${item.title} | Выделяли ${item.count} раз`
            }
            else if(lastDigit===2||lastDigit===3||lastDigit===4){
              item.title=`${item.title} | Выделяли ${item.count} раза`
            }
            else{
              item.title=`${item.title} | Выделяли ${item.count} раз`
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
