import StoreModule from '../module';

class Language extends StoreModule {

  initState() {
    return {
      currentLang: 'ru'
    }
  }

  setLanguage(lang) {
    this.setState({currentLang: lang}, `Язык интерфейса изменен на ${lang}`);
  }
}

export default Language;