/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      ...initState
    }
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
  setState(cb) {
    //Изменил на функциональную форму
    this.state = cb(this.state)
    // this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState((prevState) => {

      const newCode = Math.max(...prevState.list.map(i => i.code)) + 1
      return {
        ...prevState,
        list: [...prevState.list, { code: newCode, title: 'Новая запись',countSelected:0 }],
      }
    }
    );
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState((prevState) => {

      return {
        ...prevState,
        list: prevState.list.filter(item => item.code !== code),
      }
    }
    )
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    this.setState(
      (prevState) => {
        const isCtrlPressed = event && (event.ctrlKey || event.metaKey);
        let newList;
        if (isCtrlPressed) {
          //Если нажата кнопка
          newList = prevState.list.map((item) => {
            if (item.code === code) {
              item.selected = !item.selected;
            }
            return item;
          })
        } else {
          newList = prevState.list.map((item) => {
            if (item.code === code) {
              item.selected = !item.selected;
              if(item.selected)item.countSelected++;
            } else {
              item.selected = false;
            }
            return item;
          })
        }
        return {
          ...prevState,
          list: newList
        }
      }

    );

  }

}


export default Store;
