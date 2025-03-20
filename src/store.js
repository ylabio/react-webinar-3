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
      list: [...this.state.list, { code: this.uniqueElement(), title: 'Новая запись', count: 0 }],
      })
  }
  uniqueElement() {
    let listArray = this.state.list.map(c => c.code)
    let maxEl = Math.max(...listArray)
    let strArray = sessionStorage.getItem('uniqueArray');
    let sessionStArray = []
    if (strArray) {
      sessionStArray = JSON.parse(strArray);
    } else {
      sessionStorage.setItem('uniqueArray', JSON.stringify(listArray));
      sessionStArray = [...listArray];
    }

    let maxElsessionSt = Math.max(...sessionStArray)

    if(maxEl >= maxElsessionSt) {
      sessionStArray.push(maxEl + 1);
      sessionStorage.setItem('uniqueArray', JSON.stringify(sessionStArray));
      return maxEl + 1;

    } else {
      sessionStArray.push(maxElsessionSt + 1);
      sessionStorage.setItem('uniqueArray', JSON.stringify(sessionStArray));
      return maxElsessionSt + 1;
    }

  }

  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, { code: this.state.list.length + 1, title: 'Новая запись' }],
  //   });
  // }


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
   * @param e
   */
  selectItem(code, e) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if(item.selected) item.count ++;
        } else if (item.selected && !e.ctrlKey) {
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }
}

export default Store;
