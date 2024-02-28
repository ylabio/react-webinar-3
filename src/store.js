/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }
  numId = 8;  // Id записи (8 начальное значение)
  numSelected = 0;

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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.numId, title: 'Новая запись', q_selected: 0}]// вывожу Id записи
    })
    this.numId += 1;//прибавляю Id для следующий записи
  };

   // функция для прибавления счётчика элемента
   increment_q_selected_element (selected_item) {
    selected_item.q_selected += 1;
  }

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

  // Функция для изменения числа выделенного элемента
  fNumSelected(newCode)
  {
    this.numSelected = newCode;
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        
        if (item.code === code) {// Если итем равняется
          item.selected = !item.selected;//то меняем истуну на лож или наоборот у выделения итема
          if (item.selected == false) {
            this.fNumSelected(0);//изменяем число выделенного элемента на 0
          }
        }
        else {// если итем не равняется
          item.selected = false;//то выделение лож
        }
        if (item.selected == true) {//если выделение истина
          this.fNumSelected(item.code);//изменяем число выделенного элемента на число Id элемента в списке элементов
          this.increment_q_selected_element(item);// то прибавляем единицу к счётчику выделений элемента
        }
        return item;
      })
    })
  }
}

export default Store;
