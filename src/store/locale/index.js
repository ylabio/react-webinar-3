import StoreModule from '../module';

class LocaleState extends StoreModule {
  initState() {
    return {
      lang: localStorage.getItem('lang') || 'ru',
    };
  }

  /**
   * Установка кода языка (локали)
   * @param lang
   */
  setLang(lang) {
    localStorage.setItem('lang', lang);
    this.setState({ lang }, 'Установлена локаль');
  }
}

export default LocaleState;
