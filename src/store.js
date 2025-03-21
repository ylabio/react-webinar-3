import {createCodeGenerator, createCounter} from './utils'

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.generateCode = createCodeGenerator(this.state.list);
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
    const newCode = this.generateCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list
        .filter(item => item.code !== code)
        .map(item => ({ ...item, selected: item.selected ?? false })) // Сохраняем выделение
    });
  }
  
  /**
   * Выделение записи по её коду с поддержкой множественного выбора
   * @param {number} code - Уникальный код записи, которую нужно выделить
   * @param {Event} event - Событие клика, используемое для определения нажатых клавиш
   */
  selectItem(code, event) {
    const isMultiSelect = event.ctrlKey || event.metaKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        const isNowSelected = !item.selected;

        if (item.code === code) {
          return {
            ...item,
            selected: isNowSelected,
            selectCount: isNowSelected 
              ? (item.selectCount || 0) + 1 // Увеличиваем, если стало выделено 
              : item.selectCount             // Не меняем, если выделение снято 
          }
        }

        if (item.selected) {

        }


        return isMultiSelect ? item : {...item, selected: false}
      }),
    });
  }
}

export default Store;
