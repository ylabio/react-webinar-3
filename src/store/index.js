<<<<<<< HEAD:src/store.js
=======
import * as modules from './exports.js';

>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433:src/store/index.js
/**
 * Хранилище состояния приложения
 */
class Store {
<<<<<<< HEAD:src/store.js
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
=======

  constructor(initState = {}) {
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
     * basket: Basket,
     * catalog: Catalog,
     * modals: Modals
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name);
      this.state[name] = this.actions[name].initState();
    }
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433:src/store/index.js
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
<<<<<<< HEAD:src/store.js
   * @returns {Object}
=======
   * @returns {{basket: Object, catalog: Object, modals: Object}}
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433:src/store/index.js
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
<<<<<<< HEAD:src/store.js
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
      list: [...this.state.list, {code: this.state.list.length + 1, title: 'Новая запись'}]
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
        if (item.code === code) {
          item.selected = !item.selected;
        }
        return item;
      })
    })
=======
  setState(newState, description = 'setState') {
    console.group(
      `%c${'store.setState'} %c${description}`,
      `color: ${'#777'}; font-weight: normal`,
      `color: ${'#333'}; font-weight: bold`,
    );
    console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
    console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
    console.groupEnd();

    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433:src/store/index.js
  }
}

export default Store;
