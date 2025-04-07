import StoreModule from './module';

class Locale extends StoreModule {
  initState() {
    return {
      lang: 'ru' // По умолчанию русский
    };
  }

  /**
   * Установка языка приложения
   * @param lang {String} Код языка (ru/en)
   */
  setLang(lang) {
    this.setState({
      ...this.getState(),
      lang
    }, `Установлен язык ${lang}`);
  }
}

export default Locale;