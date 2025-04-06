import Basket from './basket';
import Catalog from './catalog';
import Modals from './modals';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor() {
    this.state = {};
    this.listeners = []; // Слушатели изменений состояния
    this.actions = {
      basket: new Basket(this, 'basket'),
      catalog: new Catalog(this, 'catalog'),
      modals: new Modals(this, 'modals'),
    };
    Object.keys(this.actions).forEach((key) => {
      this.state[key] = this.actions[key].initState();
    });
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
   * @returns {{basket: Object, catalog: Object, modals: Object}}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description) {
    this.state = newState;
    this.listeners.forEach((listener) => listener());
  }
}

export default Store;
