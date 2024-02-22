/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    //Генератор уникальных кодов
    this.generatorUniqCode = (() => {
      let startCode = 10; // начальное значение выбрал 10
      const generatedCode = new Set();

      return () => {
        let newCode;
        do {
          newCode = startCode++;
        } while (generatedCode.has(newCode));
        generatedCode.add(newCode);
        return newCode;
      };
    })();
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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
    const newCode = this.generatorUniqCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: "Новая запись" }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          if (!item.valueChecked) {
            item.valueChecked = 0;
          }
          item.selected = !item.selected;
          item.valueChecked += 1;
          item.textValueChecked = ` | Выделяли ${item.valueChecked} раз`;
        } else {
          // Отменяет выбор других элементов
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
