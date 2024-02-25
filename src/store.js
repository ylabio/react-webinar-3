/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    //this.state = initState;
    this.state = {...initState, 
    list: initState.list.map((item) => ({...item, counter: 0}))//Добавим счетчик для дальнейшего отображения при выделении записи
    }
    this.listeners = []; // Слушатели изменений состояния
    this.id = this.state.list.length + 1; //Добавим изначальное состояние id и будем его увеличивать на 1 при создании новой записи. Так и добъемся уникальности
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
      list: [...this.state.list, {code: this.id++, title: 'Новая запись', counter: 0}]//При добавлении записи устанавливаем для нее счетчик
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(e, code) {
    e.stopPropagation();
    // console.log(this.state.list.map((item) =>{
    //   if(item.code !== code && item.selected === true) {
    //     item.selected === true;
    //   }
    // }));
    this.setState({
      ...this.state,
      list: this.state.list.map((item) =>{
        if(item.code !== code && item.selected === true) {
          item.selected = true;
        }
      }),
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
          if(item.selected) {
            item.counter += 1;//Обновляем счетчик при клике
          }
        } else if(item.code !== code) {//Снимаем выделение с других записей при клике
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
