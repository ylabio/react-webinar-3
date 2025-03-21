/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.counterSelectedTimes = {}; // Счетчик сколько раз выбрана запись
    // Последний использованный код. Получаем максимальный использованный код, если список не пустой
    this.lastUsedCode =
      initState.list.length > 0 ? Math.max(...initState.list.map(item => item.code)) : 0;
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
      list: [...this.state.list, { code: ++this.lastUsedCode, title: 'Новая запись' }],
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

    // Удаляем счетчик для удалённой записи
    delete this.counterSelectedTimes[code];
  }

  // Подсчет сколько раз выбрана запись
  setCounterSelectedTimes(code) {
    if (this.counterSelectedTimes.hasOwnProperty(code)) {
      this.counterSelectedTimes[code] += 1;
    } else {
      this.counterSelectedTimes[code] = 1;
    }
  }

  /**
   * Выделение записи по коду
   * @param code
   * @param several
   */
  selectItem(code, several) {
    if (this.state.list.find(item => item.code === code).selected) {
      // Если элемент уже выделен, снимаем выделение, остальные не меняются
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            return { ...item, selected: false };
          }
          return item;
        }),
      });
    } else {
      // Обрабатываем клик на не выделенный элемент
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            this.setCounterSelectedTimes(code);
            return { ...item, selected: true };
          }
          // several=true передаётся при зажатом CTRL или cmd. В этом случае не снимаем выделение. В противном случае снимаем
          return several ? item : { ...item, selected: false };
        }),
      });
    }
  }
}

export default Store;
