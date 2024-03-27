import * as modules from './exports.js';

class Translate {

  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {}, initState = {}) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
     * translate: TranslateState
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name, {});
      this.state[name] = this.actions[name].initState();
    }
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
   * @returns {{
   * translate: Object,
   * }}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description = 'setState') {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Translate;
