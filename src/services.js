import APIService from './api';
import Store from './store';
import createStoreRedux from './store-redux';
import TranslationService from "./i18n/translations/service";

class Services {

  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
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

  get translation() {
    if (!this._translation) {
      this._translation = new TranslationService(this, this.config.translation)
    }
    return this._translation
  }
}

export default Services;
