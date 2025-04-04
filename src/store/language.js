import StoreModule from './module';

class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: 'ru', // язык по умолчанию
    };
  }

  setLanguage(lang) {
    this.setState({
      ...this.getState(),
      currentLanguage: lang,
    });
  }
}

export default Language;
