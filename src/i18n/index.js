import translate from "./translate";

class I18nService {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = "ru";

    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  t = (text, number) => {
    return translate(this.lang, text, number)
  }

  setLang = (newLang) => {
    this.lang = newLang
    console.log(this)

    if (this.config.supportServerMultilang) {
      this.services.api.setHeader("Accept-Language", newLang)
    }

    for (const listener of this.listeners) listener(this.state);
  }



}

export default I18nService;
