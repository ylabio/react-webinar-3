/**
 * Интернализация и локализация
 */
class I18n {
  constructor(services, config = {}) {
    this.services = services
    this.config = config
    this.listeners = []
    this.language = this.config.language
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  translate(lang = this.language, text, plural) {
    let result = this.config.translations[lang] && (text in this.config.translations[lang])
      ? this.config.translations[lang][text]
      : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }

  getCurrentLanguage() {
    return this.language
  }

  setLanguage(langCode) {
    this.language = langCode
    for (const listener of this.listeners) listener(this.language);
  }
}

export default I18n;