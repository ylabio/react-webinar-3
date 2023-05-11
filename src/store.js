/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list.map((item) => ({ ...item, selectedCount: 0 })),
    };
    this.listeners = []; // Слушатели изменений состояния
    this.usedCodes = []; // Массив уже использованных кодов
    this.maxCode = initState.list.reduce(
      (max, item) => (item.code > max ? item.code : max),
      0
    ); // Максимальный использованный код при создании Store
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
   * Генерация уникального кода
   * @returns {number}
   */
  generateCode() {
    const generateRandomCode = () => Math.floor(Math.random() * 9999) + 1;
    let code = this.maxCode + 1;
    while (this.usedCodes.includes(code)) {
      code = generateRandomCode();
    }
    this.usedCodes.push(code);
    this.maxCode = code;
    return code;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const code = this.generateCode();
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code, title: "Новая запись", selectedCount: 0 },
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
      list: this.state.list.filter((item) => item.code !== code),
    });
    this.usedCodes = this.usedCodes.filter((usedCode) => usedCode !== code);
    // Проверяем, остались ли записи в списке после удаления
    if (this.state.list.length === 0) {
      this.maxCode = 0; // Сбрасываем максимальный код на ноль
      this.usedCodes = []; // Очищаем массив использованных кодов
    }
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
          const selectedCount = item.selected
            ? item.selectedCount
            : item.selectedCount + 1;
          return { ...item, selected: !item.selected, selectedCount };
        } else {
          return { ...item, selected: false };
        }
      }),
    });
  }
}

export default Store;
