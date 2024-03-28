class LangToApiService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
  }

  /**
   * Устанавливает заголовок Accept-Language для API-запросов
   */
  setAcceptLanguageHeader() {
    const lang = this.services.i18n.lang;
    this.services.api.setHeader(this.config.modules.session.langHeader, lang);
  }
}

export default LangToApiService;