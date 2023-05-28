import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: "RU"
    }
  }

  /**
   * Смена языка
   * @param lang Язык
   */
  toggleLanguage(lang) {
    this.setState({
      ...this.getState(),
      language: lang,
    }, `language is ${lang}`);
  }
}

export default Language;
