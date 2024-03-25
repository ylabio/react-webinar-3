// import * as translations from '../i18n/translations';
import * as translations from './translation';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {},initState = {}) {
    this.services = services;
    this.config = config;
    this.local = 'ru';
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
  * @returns {Object}
  */
  getState() {
    return this.state;
  }

  // /**
  //  * Установка состояния
  //  * @param newState {Object}
  //  */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
  * Перевод фразу по словарю
  * @param text {String} Текст для перевода
  * @param [plural] {Number} Число для плюрализации
  * @returns {String} Переведенный текст
  */
  translate (text, plural) {
    let result = translations[this.local] && (text in translations[this.local])
      ? translations[this.local][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(this.local).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang (lang) {
    // console.log("this!!!!!!!:", this);
    this.local = lang;
    // console.log("this!!!!!!!:", this);
    // this.setState({
    //   ...this.state,
    //   local: lang
    // });
  }

  getLang (lang) {
    return this.local;
  }

}

export default I18nService;