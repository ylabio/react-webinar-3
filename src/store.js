/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.selectCounts = new Map(); // Я долго думал, как добавить счётчик на количество выделений, без прямого вмешательства в существующий list
    this.nextId = this.calculateInitialNextId(); // Один раз считаем при старте, какой ID будет следующим. Это для ситуаций где list уже существует
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


  //Считаем следующий доступный ID
  calculateInitialNextId() {
    // Убираем дубликаты (на случай, если в list есть повторяющиеся коды)
    const uniqueCodes = new Set(this.state.list.map(item => item.code));
    // Если список пуст, начинаем с 1
    if (uniqueCodes.size === 0) return 1;
    // Ищем максимальный уникальный код и добавляем 1
    return Math.max(...uniqueCodes) + 1;
  }

  addItem() {
    const newId = this.nextId; // Берем уникальный ID
    this.nextId++; // Увеличиваем счетчик, чтобы не перезаписывать ID

    this.setState({
      ...this.state,
    list: [...this.state.list, { code: newId, title: 'Новая запись' }],    });
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

        const isItemSelected = item.code === code;

        // Создаем selectCounts если не его не существует
        if (isItemSelected && !this.selectCounts.has(code)) {
          this.selectCounts.set(code, 0); 
        }

        // Прибавка счетчика
        let newSelectCount = this.selectCounts.get(code) || 0;
        if (isItemSelected && !item.selected) {
          newSelectCount++;  
        }

        //Постановка счетчика
        if (this.selectCounts.has(code)) {
          this.selectCounts.set(code, newSelectCount);
        }

        // Нажатый ctrl?
        if (event?.ctrlKey || event?.metaKey) {
          return isItemSelected 
          ? {...item, selected: !item.selected} : item
        }
        else {
          return {...item, 
            selected: isItemSelected ? !item.selected : false}
        }


      }),
    });
  }
}

export default Store;
