/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCount = initState.list[initState.list.length - 1]?.code ?? 0; // Запоминаем код последней строчки 
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

  setCount(newCount){
    this.lastCount = newCount + 1; // К коду, который мы запомнили, добавляем +1
    return this.lastCount // Возвращаем результат
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.setCount(this.lastCount), title: 'Новая запись', countSelect:0}]
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
        if (item.code != code) {
          item.selected = false;
        } /* <-- Если мы вызываем при помощи map весь список, 
         то можно просто изначально убирать выделения со всех остальных записей */
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected === true){ 
            item.countSelect = item.countSelect + 1;
            /* Создал доп. проверку, ведь нам нужно прибавлять число выделений только тогда, когда мы выделяем строку 
            (Без проверки число бы увеличивалось даже если мы выделяем другую строку) */
          }
        }
        return item;
      })
    })
  }
  
  countForm(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return ` ${count} раз`;
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return ` ${count} раза`;
    } else {
      return ` ${count} раз`;
    }
  }
  
}

export default Store;
