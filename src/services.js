import APIService from './api';
import Store from './store';
import createStoreRedux from './store-redux';
import I18n from './services/I18n';

class Services {
  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис мультиязычности
   * @returns {I18n}
   */
  get i18n() {
    if (!this._i18n) {
      this._i18n = new I18n('ru'); // язык по умолчанию

      // Установить заголовок в API при инициализации
      this.api.setHeader('Accept-Language', this._i18n.getLocale());

      // При смене языка — обновить заголовок
      this._i18n.onChange(lang => {
        this.api.setHeader('Accept-Language', lang);
      });
    }
    return this._i18n;
  }

  /**
   * Сервис API
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Кастомный store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}

export default Services;
