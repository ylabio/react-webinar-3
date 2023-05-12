
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.codes = [];
    this.initialNumberElements = this.state.list.length + 1;
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
    let codes = this.codes;
    let initialNumberElements = this.initialNumberElements;
    let uniCode;
    const list = this.state.list;
    function addUniquenessCode(){
      function addCodesArr() {
        list.forEach(obj => {
          codes.push(obj.code);
        });
      }
      if (codes.length == 0){addCodesArr()};
      if (!uniCode){uniCode = initialNumberElements;}
      function uniquenessCheck(){  
        if(codes.includes(uniCode)){
          uniCode = Math.max.apply(null, codes) + 1
        }
        codes.push(uniCode);
        return uniCode;
      }   
      return uniquenessCheck();
    }
    uniCode = addUniquenessCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: uniCode, title: 'Новая запись'}],
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
          if (item.selected == true){
            item.count++;
          }
        } else {
          item.selected = false
        }   
        return item;
      })
    })
  }
}

export default Store;
