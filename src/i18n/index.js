import * as translations from "./translations";

class I18n {
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {}, initState = {}) {
    this.services = services;
    this.config = config;
    this.listeners = ['rt']; // Слушатели изменений состояния
    this.state = initState;
    this.lang = "ru";
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }



  translate(lang, text, plural) {
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
 showServis(){
    return this.services;
 }
  setLang(lang) {
    console.log(lang)
    this.state = lang;
console.log(this.listeners)
  // this.listeners.push('sa')
    // for (const listener of this.listeners) {
    //   listener(lang);
    // }
    
  
  }
  t = (text, number) => this.translate(this.lang, text, number);
}

export default I18n;
