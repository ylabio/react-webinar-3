/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    //Генератор уникальных кодов
    this.generatorUniqCode = (() => {
      //Определяет значение динамически, на основе последнего содержимого массива
      let startCode = this.state.list.length
        ? Math.max(...this.state.list.map((item) => item.code)) + 1
        : 1;

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

    // функция правильного окончания (раз или раза)
    this.getRightEnding = (value) => {
      let strValue = value.toString();
      let lastTwoNum = Number(strValue.slice(-2));

      if (lastTwoNum >= 12 && lastTwoNum <= 14) {
        return "";
      } else {
        if (lastTwoNum % 10 >= 2 && lastTwoNum % 10 <= 4) {
          return "а";
        } else {
          return "";
        }
      }
    };
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
      ...this.state.list,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(event, code) {
    //если клик происходит по кнопке "удалить ", то Item не выбирается (прерывает всплытие).
    if (event.target.closest(".button-delete")) return;

    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          if (item.selected) {
            item.selected = false;
          } else {
            // Записывает количество кликов
            item.selected = true;
            !item.valueChecked
              ? (item.valueChecked = 1)
              : (item.valueChecked += 1);
          }
          // Текст о количестве кликов
          item.textValueChecked =
            item.valueChecked > 0
              ? ` | Выделили ${item.valueChecked} раз${this.getRightEnding(
                  item.valueChecked
                )}`
              : "";
        } else {
          item.selected = false;
        }

        return item;
      }),
    });
  }
}

export default Store;
