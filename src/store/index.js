import * as modules from './exports.js';

export const ruLanguage = {
  country: 'RU',
  market: 'Магазин',
  basket: 'Корзина',
  add: 'Добавить',
  delete: 'Удалить',
  close: 'Закрыть',
  total: 'Итого',
  language: 'Язык',
  move: 'Перейти',
  inBasket: 'В корзине',
  empty: 'пусто',
  main: 'Главная',
  product: 'товар',
  pluralProduct: 'товара',
  pluralProducts: 'товаров',
  countryOfManufacture: 'Страна производитель',
  category: 'Категория',
  year: 'год',
  price: 'Цена',
}

const enLanguage = {
  country: 'EN',
  market: 'Market',
  basket: 'Basket',
  add: 'Add',
  delete: 'Delete',
  close: 'Close',
  total: 'Total',
  language: 'Language',
  move: 'Move',
  inBasket: 'In basket',
  empty: 'empty',
  main: 'Main',
  product: 'product',
  pluralProduct: 'products',
  pluralProducts: 'products',
  countryOfManufacture: 'Country of manufacture',
  category: 'Category',
  year: 'year',
  price: 'Price',
}

/**
 * Хранилище состояния приложения
 */
class Store {

  constructor(initState = { language: ruLanguage }) {
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
   * @returns {{basket: Object, catalog: Object, modals: Object}}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
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
  }

  changeLanguage() {
    const newLanguage = this.getState().language.country === 'RU' ? 'EN' : 'RU';
    this.setState({
      ...this.getState(),
      language: newLanguage === 'RU' ? ruLanguage : enLanguage
    })
  }
}

export default Store;
