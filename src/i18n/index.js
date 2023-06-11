import translate from "./translate";

class I18n {
  constructor(services, config = {}) {
    this._services = services;
    this._config = config;
    this._lang = config.defaultLang || 'en';
    this._subcribers = {};
    this._lastSubcriberId = 0;
  }

  addSubscriber(rerenderCallback) {
    const id = this._lastSubcriberId + 1;
    this._subcribers[id] = rerenderCallback;
    this._lastSubcriberId = id;
    return id;
  }

  deleteSubscriber(subscriberId) {
    delete this._subcribers[subscriberId];
  }

  subscribersRerender() {
    Object.keys(this._subcribers).forEach(key => {
      const subscribersRerender = this._subcribers[key];
      if (subscribersRerender) {
        console.log('Обновление текущих подписантов на i18n c id =', key);
        subscribersRerender();
      }
    })
  }

  get lang() {
    return this._lang;
  }

  set lang(value) {
    this._lang = value;
    this.subscribersRerender();
  }

  get translate() {
    return (text, number) => translate(this._lang, text, number);
  }
}

export default I18n;
