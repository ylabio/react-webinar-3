import StoreModule from "../module";

class LanguageReducer extends StoreModule {

  initState() {
    return {
      language: 'ru'
    }
  }

  setLanguage(language) {
    this.setState({language})
  }
}

export default LanguageReducer;