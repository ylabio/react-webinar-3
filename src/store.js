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
  
    this.setState({
      list: [...this.state.list, {code: Date.now(), title: 'Новая запись'}]
    })
  };

  //Если дать уникальный код именно в выводе можно сделвть сортировку
sortList(lists){
  //Не совсем понимаю зачем так делать. Если говорить об уникальности то я бы использовал nanoid()
  //Или бы время в милисекундах, но так как отображается список, решил сортировать
  //Вывод списка в файле app сделал бы по индексу
  const updateSortLists=lists.map((elem,i)=>{return{code: i+1, title: elem.title}})
  return  updateSortLists
}
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      list: this.state.list.filter(item => item.code !== code)
    })
  };
  // deleteItem(code) {
  //   const deleteList=this.state.list.filter(item => item.code !== code);
  //   this.setState({
  //     list: this.sortList(deleteList)
  //   })
  // };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
   
    this.setState({
      
      list: this.state.list.map(item => {
        let count=0;


        if (item.code === code) {
          item.selected = !item.selected; 
   
          if(item.count===0 || item.count==undefined){
            count++;
          } 
           if(item.count>0){
            count=item.count+1;
          }
      
        }
        else{
          if(item.count!=undefined && item.count>0){
            count=item.count;
          }
          item.selected=false;
        }
 
        return {code:item.code, title:item.title,selected:item.selected, count:count};
      })
      ,
 
    })
  }
}

export default Store;
