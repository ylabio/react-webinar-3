import * as translations from './translations';

class I18nService {

  constructor(services, config = {}) {
    this.services = services
    this.config = config
    this.listeners = [];
    this.lang = 'ru'
  }

  /**
   * Перевод фразы по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
 */
  translate(text, plural, lang = this.lang) {
    let result = translations[lang] && text in translations[lang] ? translations[lang][text] : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }

  /**
   * Получение текущего языка
   * @returns {String}
   */
  getLang() {
    return this.lang
  }

  /**
   * Установка нового языка
   * @param newLang {String}
   * @returns {}
   */
  setLang(newLang) {
    this.lang = newLang
    this.services.api.setHeader('X-Lang', newLang)
    this.services.api.setHeader('Accept-Languages', newLang)

    for (const listener of this.listeners) {
      listener(this.lang);
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
    };
  }
}

export default I18nService