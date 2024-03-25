import * as translations from './translations';

 class I18nService {
  constructor(services, config={}) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.lang = 'ru';
  }

  translate(text, plural,lang=this.lang ) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;
  
    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  
  getLang(){
    return this.lang
  }

  setLang(lang){
    this.lang=lang
    this.services.api.setHeader('Accept-Language',this.lang)
    for (const listener of this.listeners) listener(this.lang);
  }


}

export default I18nService