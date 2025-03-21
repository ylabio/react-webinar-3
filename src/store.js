/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode = this.setMaxCode();
  }

  /**
 * Фиксировать максимальную длину
 */
  setMaxCode() {
    const maxCode = [];
    if (this.state.list && this.state.list.length > 0) {
      this.state.list.forEach(el => {
        if (el.code !== undefined) {
          maxCode.push(el.code);
        }
      });
    }

    return maxCode;
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
   * Генерация уникального id
   */
  getCode() {
    this.maxCode.push(this.maxCode.length);
    return this.maxCode.length;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const generateNewCode = this.getCode();
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          //Реализация генерацию уникальных числовых кодов
          code: generateNewCode,
          title: 'Новая запись',
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
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        // Если при клике на запись дополнительно удерживать клавишу Ctrl (или Cmd на macOS)
        if (event.metaKey || event.ctrlKey) {
          return item.code === code ? { ...item, selected: !item.selected } : item;
        } else {
          // Иначе выделять при клике только одну запись,
          // при клике на другую запись будет сбрасываться на другой
          return {
            ...item,
            selected: item.code === code ? !item.selected : false,
            // Количество совершенных выделений для каждой записи
            count: item.code === code && !item.selected ? (item.count || 0) + 1 : item.count,
          };
        }
      }),
    });
  }
}

export default Store;
