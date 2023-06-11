import * as translations from "./translations";

class I18n {
  constructor(services, config = {}) {
    this.services = services;
    this.config = { lang: "en", ...config };
		// this.setServicesLang()
		this.listeners = []
  }

  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate({lang = this.lang, text, plural}) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

	subscribe(callback) {
		this.listeners.push(callback)
		return () => this.listeners = this.listeners.filter((cb) => cb !== callback);
	}
	notify() {
		this.listeners.forEach((cb) => cb(this.config.lang))
	}

  setLang(lang) {
    this.config = {...this.config, lang}
		// this.setServicesLang()
		this.notify()
  }

	// setServicesLang() {
	// 	this.services.api.setHeader("Accept-Language", this.config.lang);
	// }

  get lang() {
    return this.config.lang;
  }
}

export default I18n;
