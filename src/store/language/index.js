import StoreModule from '../module';

class Language extends StoreModule {

  initState() {
    const currentLang = localStorage.getItem('language');

    return {
      currentLang: currentLang ? currentLang : 'ru'
    }
  }

  setLanguage(lang) {
    localStorage.setItem('language', lang);
    this.setState({currentLang: lang}, `Язык интерфейса изменен на ${lang}`);
  }
}

export default Language;