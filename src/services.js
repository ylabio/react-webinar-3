import APIService  from './api';
import I18nService from './i18n/service';
import Store from './store';
import createStoreRedux from './store-redux';

export default class Services {
  constructor(config) {
    this.config = config;

    this._api = new APIService(this, this.config.api);

    this.i18n = new I18nService(this.config.i18n, this);
  }

  get api() {
    return this._api;
  }

  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}
