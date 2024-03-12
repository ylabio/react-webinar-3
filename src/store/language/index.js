import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      currentLanguage: document.documentElement.lang,
      languages: {
        'ru': 'Русский',
        'en': 'English'
      }
    }
  }

  setLanguage(name) {
    document.documentElement.setAttribute('lang', name)
    this.setState({...this.getState(), currentLanguage: name} );
  }
}

export default Language;
