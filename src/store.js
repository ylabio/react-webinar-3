class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.keydown = null;
    this.lastUsedCode = this.state.list.length
      ? Math.max(...this.state.list.map(item => item.code))
      : 0; // Хранит последний использованный код
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
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

  getKeydown(event) {
    this.keydown = event;
    console.log(this.keydown);
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    // Увеличиваем lastUsedCode на 1 для новой записи
    this.lastUsedCode += 1;

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.lastUsedCode,
          title: 'Новая запись',
          click: 0,
        },
      ],
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

    // Обновляем lastUsedCode, если удаляем запись с максимальным кодом
    if (code === this.lastUsedCode) {
      this.lastUsedCode = Math.max(...this.state.list.map(item => item.code), this.lastUsedCode); // Обновляем lastUsedCode
    }
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    console.log(this.state);
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (this.keydown === 'Control' && item.code === code) {
          !item.selected ? (item.click = item.click + 1) : ''; // сколько раз выделяли
          item.selected = !item.selected;
        } else if (this.keydown === 'Control' && item.code !== code) {
          // ничего не делаем
        } else if (item.code === code) {
          !item.selected ? (item.click = item.click + 1) : ''; // сколько раз выделяли
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
