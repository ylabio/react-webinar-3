import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      currentLang: 'ru',
    };
  }

  switchLanguage() {
    const lang = this.getState().currentLang === 'ru' ? 'en' : 'ru';

    this.setState({
      ...this.getState(),
      currentLang: lang,
    });
  }
}

export default Language;
