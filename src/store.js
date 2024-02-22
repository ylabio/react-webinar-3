import { useId } from "react";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    initState.list = initState.list.map(el => {return {...el,clickCount : 0}}) //Всем поступившим элементам добавляем clickCount = 0
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
   * Генерируем уникальный code
   */
  keyGen(){
      return Math.max(...this.state.list.map(el => el.code),0) + 1 //,0 для предотвращения -inf при пустом массиве list
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code:this.keyGen(), title: 'Новая запись',clickCount:0}]
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
          if(!item.selected){   //Проверка если кликают по тому же элементу счетчик не увеличиватеся
            item.clickCount+=1
          }
          item.selected = !item.selected;
        }else{
          item.selected = false; //Всем элементам которые не выделены
        }
        return item;
      })
    })
  }
}

export default Store;
